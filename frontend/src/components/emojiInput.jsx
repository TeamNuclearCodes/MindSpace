import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import emoji from "@/assets/chatSpace/emoji.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function EmojiInput({ onEmojiClick }) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ display: "inline-block" }} ref={pickerRef}>
      {/* Button */}
      <button
        onClick={() => setShowPicker((prev) => !prev)}
        className="relative flex justify-center items-center"
      >
        {showPicker ? (
          <FontAwesomeIcon icon={faXmark} size="2x" color="#000000" />
        ) : (
          <Image src={emoji} alt="Emoji Picker" className="w-8" />
        )}
      </button>

      {/* Emoji Picker */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            bottom: "15%", // Adjust to position the picker above the button
            right: "40%",
            zIndex: 1000, // Ensure it stays on top
          }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default EmojiInput;
