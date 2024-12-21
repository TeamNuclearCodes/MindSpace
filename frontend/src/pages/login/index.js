"use client";
import React, { useEffect, useState } from "react";
import { login, signup } from "@/util/auth";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginMode, setLoginMode] = useState(true);

  const router = useRouter();
  const { setUser, user } = useAuth();

  useEffect(() => {
    user && router.push("./chatspace");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginMode) {
      const res = await login(username, password).then((res) => {
        router.push("/chatspace");
        setUser(res.data);
      });
    } else {
      const res = await signup(username, password, email).then((res) => {
        router.push("/chatspace");
        setUser(res.data);
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#EFF6FC]">
      <div className="flex shadow-blue-glow h-[50vh] flex-col p-10 w-[40vw] rounded-[20px] overflow-hidden bg-white justify-center items-center">
        <h1 className="text-4xl font-roboto">
          {loginMode ? "LOGIN" : "SIGNUP"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center flex-grow gap-3"
        >
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#EFF6FC] shadow-blue-glow text-center rounded-[20px] p-2 w-80 font-roboto text-black"
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#EFF6FC] shadow-blue-glow text-center rounded-[20px] p-2 w-80 font-roboto text-black"
          />
          {!loginMode && (
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#EFF6FC] shadow-blue-glow text-center rounded-[20px] p-2 w-80 font-roboto text-black"
            />
          )}
          <button
            type="submit"
            className="rounded-[20px] bg-[#E7E7E7] shadow-gray-glow p-2 w-40"
          >
            submit
          </button>
        </form>
        {loginMode ? (
          <p className="font-roboto">
            New here?{" "}
            <span
              onClick={() => setLoginMode(false)}
              className="cursor-pointer hover:text-cyan-600"
            >
              SignUp
            </span>{" "}
          </p>
        ) : (
          <p className="font-roboto">
            Already a user?{" "}
            <span
              onClick={() => setLoginMode(true)}
              className="cursor-pointer hover:text-cyan-600"
            >
              LogInMode
            </span>{" "}
          </p>
        )}{" "}
      </div>
    </div>
  );
}

export default Index;
