import React, { useState } from "react";
import "./Input.css";
import axios from "axios";
import { io } from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import { chat } from "@/util/apiroutes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ChatInput({ currentGrp, user }) {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

  const [msg, setMsg] = useState("");
  const sendMsg = async (e) => {
    e.preventDefault();
    if (msg === "") return;
    setMsg("");
    try {
      console.log(msg);
      socket.on("connect", () => {
        console.log("sender connected");
      });
      socket.emit("send-message", msg, currentGrp, user);
      const res = await axios.post(
        chat,
        {
          grp: currentGrp,
          msg: msg,
          from: user,
        },
        { withCredentials: true }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(msg);
  };
  return (
    <form onSubmit={sendMsg} className="flex gap-2 p-2 border-t">
      <Input
        type="text"
        placeholder="Enter your msg"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <Button type="submit">
        <IoIosSend /> Send
      </Button>
    </form>
  );
}

export default ChatInput;
