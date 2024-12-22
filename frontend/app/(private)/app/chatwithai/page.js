"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useAuth } from "@/context/authContext";
import { aiClctMsg, aiChat } from "@/util/apiroutes";
import axios from "axios";

const page = () => {
  const { user } = useAuth();
  const chatBoxRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msgs,setMsgs] = useState([]);

  const sendAIMessages = async (e) => {
    e.preventDefault();
    setMsgs([...msgs, {
      sender: "you",
      content: msg
    }]);
    const req = await axios.post("http://noice.com", {message: msg});
    const data = req.data;
    setMsgs([...msgs, {
      sender: "AI",
      content: data?.message
    }]);
  }


  const msgUserType = (msg) => {
    return msg.sender === "you" ? "ml-auto text-right" : "mr-auto text-left";
  };

  return (
    <div className="py-2 mt-2">
      <Card className="flex flex-col w-full bg-white rounded-md h-[calc(100vh-6rem)] relative">
        <CardHeader className="font-[600] text-xl bg-primary text-white rounded-t-md px-4 py-2 flex justify-between items-center flex-row">
          AI Therapist
        </CardHeader>
        <CardContent className="flex flex-col w-full overflow-scroll px-4 py-2 gap-2 mb-20">
          {msgs.map((msg, index) => (
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
                  msg.sender === "you" ? "rounded-l-md" : "rounded-r-md"
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
          <form onSubmit={sendAIMessages} className="flex gap-2 p-2 border-t">
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
        </div>
      </Card>
    </div>
  );
};

export default page;
