"use client";
import { useEffect, useState } from "react";
import Groups from "@/components/Groups/Groups";
import ChatSpace from "@/components/ChatSpace/ChatSpace";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { listRooms } from "@/util/apiroutes";

function Chat() {
  const router = useRouter();
  const [username, setUser] = useState("");
  const { user } = useAuth();
  const [chatgrps, setChatgrps] = useState([]);
  const [room, setRoom] = useState("");

  const [selectedGrp, setSelectedGrps] = useState(undefined);
  const changeSelected = (grp) => {
    setSelectedGrps(grp);
  };
  const changeRoom = (room) => {
    setRoom(room);
  };

  const fetchRooms = async () => {
    const data = await axios.post(
      listRooms,
      {
        username: user.username,
      },
      { withCredentials: true }
    );
    setChatgrps(data.data);
  };
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setUser(user.username);
      fetchRooms();
    }
  }, []);
  return (
    <div className="container px-2">
      <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
        <Groups
          grps={chatgrps}
          handleSelect={changeSelected}
          selectedGrp={selectedGrp}
          changeRoom={changeRoom}
          room={room}
          setChatgrps={setChatgrps}
        />
        <div className="flex w-9/12 justify-center">
          {selectedGrp === undefined ? (
            <div className="welcome">Select a room to continue</div>
          ) : (
            <ChatSpace selectedGrp={selectedGrp} user={username} room={room} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
