"use client";
import { useEffect, useRef } from 'react';
import { useAudioCall } from '@/hooks/useAudioCall';

const AudioCall = ({ ws }) => {
  const { callState, startCall, endCall } = useAudioCall(ws);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    if (localAudioRef.current && callState.localStream) {
      localAudioRef.current.srcObject = callState.localStream;
    }
    if (remoteAudioRef.current && callState.remoteStream) {
      remoteAudioRef.current.srcObject = callState.remoteStream;
    }
  }, [callState.localStream, callState.remoteStream]);

  return (
    <div>
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />
      
      {callState.status === 'idle' && (
        <button onClick={() => startCall("other-user-id")}>Start Call</button>
      )}
      
      {callState.status !== 'idle' && (
        <button onClick={endCall}>End Call</button>
      )}
      
      <div>Call Status: {callState.status}</div>
    </div>
  );
};

export default AudioCall;