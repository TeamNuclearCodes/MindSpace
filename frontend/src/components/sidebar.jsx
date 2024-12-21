"use client";
import { React, useState } from "react";
import dp from "@/assets/sidebar/dp.png";
import home from "@/assets/sidebar/Home.png";
import message from "@/assets/sidebar/Message.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import notification from "@/assets/sidebar/Notification.png";
import logoutImg from "@/assets/sidebar/Logout.png";
import Image from "next/image";
import { logout } from "@/util/auth";
import Link from "next/link";
import HoverText from "./HoverText";
import { useRouter } from "next/router";

function Sidebar({ user }) {
  const router = useRouter();
  const [selected, setSelected] = useState(router.pathname.slice(1));

  const handleClick = (e) => {
    setSelected(e);
    router.push("/" + e);
  };

  return (
    <div className="bg-[#6E00FF] h-full py-5 rounded-[20px] flex flex-col justify-between items-center min-w-[5%] max-w-[5%]">
      <div className="flex flex-col gap-10 items-center w-full mx-3">
        <HoverText text={user.username}>
          <Image
            src={user.img || dp}
            alt="User Name"
            className="rounded-full w-14 h-14"
          />
        </HoverText>

        <div className="flex flex-col items-center w-full">
          <HoverText text={"home"}>
            <button
              className={`home hover:bg-[#612DD1]/90 w-full flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out py-5 ${
                selected === "home"
                  ? "relative before:w-[6px] bg-[#612DD1]/90 before:bg-[#F3B559] before:h-full before:right-0 before:absolute"
                  : ""
              }`}
              onClick={() => handleClick("home")}
            >
              <Image src={home} alt="home" className="rounded w-12" />
            </button>
          </HoverText>

          <HoverText text={"messages"}>
            <button
              className={`chatspace hover:bg-[#612DD1]/90 w-full flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out p-5 ${
                selected === "chatspace"
                  ? "relative before:w-[6px] bg-[#612DD1]/90 before:bg-[#F3B559] before:h-full before:right-0 before:absolute"
                  : ""
              }`}
              onClick={() => handleClick("chatspace")}
            >
              <Image src={message} alt="chatspace" className="rounded min-w-12" />
            </button>
          </HoverText>

          {/* Notifications Menu Item */}
          <HoverText text={"profile"}>
            <button
              className={`profile hover:bg-[#612DD1]/90 w-full flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out p-5 ${
                selected === "profile"
                  ? "relative before:w-[6px] bg-[#612DD1]/90 before:bg-[#F3B559] before:h-full before:right-0 before:absolute"
                  : ""
              }`}
              onClick={() => handleClick("profile")}
            >
              <FontAwesomeIcon
                icon={faUser}
                size="2xl"
                style={{ color: "#ffffff" }}
              />{" "}
            </button>
          </HoverText>

          {/* Settings Menu Item */}
          <HoverText text={"notifications"}>
            <button
              className={`notification hover:bg-[#612DD1]/90 w-full flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out p-5 ${
                selected === "notification"
                  ? "relative before:w-[6px] bg-[#612DD1]/90 before:bg-[#F3B559] before:h-full before:right-0 before:absolute"
                  : ""
              }`}
              onClick={() => handleClick("notification")}
            >
              <Image
                src={notification}
                alt="notification"
                className="rounded w-12"
              />
            </button>
          </HoverText>
        </div>
      </div>
      <Link href="/login">
        <HoverText text={"logout"}>
          <button
            className="block2 logout w-full flex justify-center items-center"
            onClick={logout}
          >
            <Image src={logoutImg} alt="logout" className="rounded w-12" />
          </button>
        </HoverText>
      </Link>
    </div>
  );
}

export default Sidebar;
