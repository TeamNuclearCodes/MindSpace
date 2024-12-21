"use client";
import React, { useState } from "react";
import a from "@/assets/temp/People/A.png";
import phone from "@/assets/chatSpace/phone.svg";
import video from "@/assets/chatSpace/video.svg";
import more from "@/assets/chatSpace/more.svg";
import pin from "@/assets/chatSpace/attachment.svg";
import EmojiInput from "./emojiInput";
import mic from "@/assets/chatSpace/mic.svg";
import Webcam from "./webcam";
import Image from "next/image";

function ChatSpace() {
  const [text, setText] = useState("");

  const textUpdate = (e) => {
    setText(e.target.value);
  };

  const onEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="shadow-blue-glow w-full h-full bg-white rounded-[20px] p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Image src={a} alt="" className="w-14 h-14" />
            <div className="flex flex-col">
              <p>Anil</p>
              <p>Online - Last seen, 2.02pm</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <Image src={phone} alt="" className="w-8 h-8" />
            <Image src={video} alt="" className="w-8 h-8" />
            <Image src={more} alt="" className="w-8 h-8" />
          </div>
        </div>
        <div className="min-h-[1px] bg-[#B4ABAB] w-full my-3" />
      </div>
      <div className="flex justify-between gap-3">
        <div className="rounded-[20px] bg-[#EFF6FC] flex p-3 flex-grow items-center justify-between">
          <div className="flex  gap-3 flex-grow">
            <input type="file" id="inputFile" className="hidden" />
            <label htmlFor="inputFile">
              <Image src={pin} alt="" />
            </label>
            <EmojiInput onEmojiClick={onEmojiClick} />
            <input
              type="text"
              onChange={(e) => {
                textUpdate(e);
                console.log(text);
              }}
              value={text}
              className="outline-none text-[#7C7C7C] text-2xl font-roboto bg-transparent flex-grow"
              placeholder="Type your message here..."
            />
          </div>
          <div className="flex gap-5">
            <Webcam />
          </div>
        </div>
        <div className="bg-[#6E00FF] flex justify-center items-center rounded-[20px] w-20">
          <Image src={mic} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ChatSpace;
