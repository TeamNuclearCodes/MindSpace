import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import webcam from "@/assets/chatSpace/webcam.svg";
import Image from "next/image";

function Webcam() {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const streamRef = useRef(null); // Reference to the webcam stream

  // Function to start the webcam
  const startWebcam = async () => {
    try {
      // Access the webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // Only video stream
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setIsWebcamActive(true); // Update state to show webcam
    } catch (error) {
      console.error("Error accessing webcam: ", error);
    }
  };

  const stopWebcam = () => {
    const stream = streamRef.current;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks (camera)
      videoRef.current.srcObject = null; // Clear the video feed
      setIsWebcamActive(false); // Update state
    }
  };

  return (
    <div>
      <button onClick={isWebcamActive ? stopWebcam : startWebcam}>
        {isWebcamActive ? (
          <FontAwesomeIcon icon={faXmark} size="2x" color="#000000" />
        ) : (
          <Image src={webcam} alt="camera" className="w-8" />
        )}
      </button>

      {/* <div style={{ marginTop: "20px" }}>
        <video
          ref={videoRef}
          autoPlay
          width="100%"
          height="auto"
          style={{ border: "1px solid #000", marginTop: "10px" }}
        />
      </div> */}
    </div>
  );
}

export default Webcam;
