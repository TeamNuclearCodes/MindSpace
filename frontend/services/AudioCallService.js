const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export class AudioCallService {
  constructor(ws, onStateChange) {
    this.peerConnection = null;
    this.localStream = null;
    this.ws = ws;
    this.onStateChange = onStateChange;

    this.ws.addEventListener("message", this.handleWebSocketMessage);
  }

  async setupPeerConnection(remoteUserId) {
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);

    // Get local audio stream
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.localStream.getTracks().forEach((track) => {
        if (this.localStream && this.peerConnection) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });
    } catch (err) {
      console.error("Error accessing microphone:", err);
      throw new Error("Microphone access denied");
    }

    // Handle incoming remote stream
    this.peerConnection.ontrack = (event) => {
      this.onStateChange({
        status: "connected",
        remoteUserId,
        localStream: this.localStream,
        remoteStream: event.streams[0],
      });
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.ws.send(
          JSON.stringify({
            type: "ice-candidate",
            candidate: event.candidate,
            targetUserId: remoteUserId,
          })
        );
      }
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection.connectionState === "disconnected") {
        this.handleCallEnd();
      }
    };
  }

  handleWebSocketMessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case "call-offer":
        await this.handleCallOffer(data);
        break;
      case "call-answer":
        await this.handleCallAnswer(data);
        break;
      case "ice-candidate":
        await this.handleIceCandidate(data);
        break;
      case "call-reject":
        this.handleCallReject();
        break;
      case "call-end":
        this.handleCallEnd();
        break;
    }
  };

  async handleCallOffer(data) {
    try {
      await this.setupPeerConnection(data.fromUserId);

      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        this.ws.send(
          JSON.stringify({
            type: "call-answer",
            answer,
            targetUserId: data.fromUserId,
          })
        );

        this.onStateChange({
          status: "connected",
          remoteUserId: data.fromUserId,
          localStream: this.localStream,
          remoteStream: null,
        });
      }
    } catch (err) {
      console.error("Error handling call offer:", err);
      this.handleCallEnd();
    }
  }

  async handleCallAnswer(data) {
    try {
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    } catch (err) {
      console.error("Error handling call answer:", err);
      this.handleCallEnd();
    }
  }

  async handleIceCandidate(data) {
    try {
      if (this.peerConnection) {
        await this.peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    } catch (err) {
      console.error("Error handling ICE candidate:", err);
    }
  }

  handleCallReject() {
    this.cleanup();
    this.onStateChange({
      status: "idle",
      remoteUserId: null,
      localStream: null,
      remoteStream: null,
    });
  }

  handleCallEnd() {
    this.cleanup();
    this.onStateChange({
      status: "idle",
      remoteUserId: null,
      localStream: null,
      remoteStream: null,
    });
  }

  async startCall(targetUserId) {
    try {
      await this.setupPeerConnection(targetUserId);

      if (this.peerConnection) {
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        this.ws.send(
          JSON.stringify({
            type: "call-offer",
            offer,
            targetUserId,
          })
        );

        this.onStateChange({
          status: "calling",
          remoteUserId: targetUserId,
          localStream: this.localStream,
          remoteStream: null,
        });
      }
    } catch (err) {
      console.error("Error starting call:", err);
      this.handleCallEnd();
    }
  }

  endCall() {
    if (this.peerConnection) {
      this.ws.send(
        JSON.stringify({
          type: "call-end",
          targetUserId: this.peerConnection.remoteDescription?.sdp,
        })
      );
      this.cleanup();
    }
  }

  cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    this.peerConnection = null;
    this.localStream = null;
  }
}
