import React, { useEffect, useState, useRef } from "react";
import "./ChatSpace.css";
import Input from "../Input/Input";
import axios from "axios";
import { io } from "socket.io-client";
import { MdVideocam } from "react-icons/md";
import { clctMsg } from "@/util/apiroutes";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function ChatSpace({ selectedGrp, user, room }) {
  const chatBoxRef = useRef(null);

  const scrollDown = () => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
  socket.on("connect", () => {
    socket.on("receive-message", (message) => {
      console.log(message);
      extractMsg(message.content, message.sender);
      scrollDown();
    });
  });

  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        socket.emit("join", room);
        const response = await axios.post(
          clctMsg,
          {
            grp: room,
          },
          {
            withCredentials: true,
          }
        );
        setMsg(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
    setTimeout(() => {
      scrollDown();
    }, [300]);
  }, [selectedGrp]);

  const extractMsg = (message, user) => {
    setMsg((prev) => [...prev, { sender: user, content: message }]);
    scrollDown();
  };

  const msgUserType = (msg) => {
    return msg.sender == user ? "ml-auto text-right" : "mr-auto text-left";
  };
  return (
    <Card className="flex flex-col w-full bg-white rounded-md h-[calc(100vh-6rem)] relative">
      <CardHeader className="font-[600] text-xl bg-primary text-white rounded-t-md px-4 py-2 flex justify-between items-center flex-row">
        {selectedGrp}
        <MdVideocam />
      </CardHeader>
      <CardContent className="flex flex-col w-full overflow-scroll px-4 py-2 gap-2 mb-20">
        {msg.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msgUserType(
              msg
            )} min-w-[100px] max-w-[350px]`}
          >
            <div className="flex text-white">
              <p
                className={`text-[15px] font-[600] px-[5px] rounded-t-md bg-primary  ${msgUserType(
                  msg
                )}`}
              >
                {msg.sender}
              </p>
            </div>
            <p
              className={`text-[15px] px-2 py-1 bg-white border text-black rounded-b-md ${
                msg.sender == user ? "rounded-l-md" : "rounded-r-md"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
        <div className="mb-[50px]" />
        <div ref={chatBoxRef} />
      </CardContent>
      <div className="bottom-0 left-0 absolute w-full border-t-2 border-t-white">
        <Input currentGrp={room} user={user} />
      </div>
    </Card>
  );
}
