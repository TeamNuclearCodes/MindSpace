"use client";
import React, { useState, useRef } from "react";
import { LuWebcam } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import AudioProcessor from "./Text";

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
      videoRef.current.play(); // Ensure video is playing
      setIsWebcamActive(true); // Update state to show webcam
      console.log("Webcam started"); // Debug log
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
      console.log("Webcam stopped"); // Debug log
    }
  };

  return (
    <div>
      <button onClick={isWebcamActive ? stopWebcam : startWebcam}>
        {isWebcamActive ? <FaXmark /> : <LuWebcam />}
      </button>

      <div style={{ marginTop: "20px" }}>
        {/* <AudioProcessor /> */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted // Mute to avoid echo issues
          style={{
            width: "100%", // Ensure the video takes full width
            height: "auto",
            border: "1px solid #000",
            marginTop: "10px",
            display: isWebcamActive ? "block" : "none", // Hide if inactive
          }}
        />
        <p className="mt-4">Number of people in the room: 1</p>
      </div>
    </div>
  );
}

export default Webcam;
