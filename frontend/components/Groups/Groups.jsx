import React, { useState } from "react";
import "./Group.css";
import axios from "axios";
import { Button } from "../ui/button";
import { useAuth } from "../../context/authContext";
import { IoMdAdd } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";
import { createGrp, joinGroup } from "@/util/apiroutes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

function Groups({ grps, handleSelect, selectedGrp, changeRoom, room, setChatgrps }) {
  const { user } = useAuth();

  const [grpName, setGrpName] = useState("");

  const [mode, setMode] = useState("grps");

  const setSelectGrp = (grp) => {
    handleSelect(grp);
    changeRoom(grp);
  };

  const joinGrp = async () => {
    try {
      console.log(joinGroup);
      const res = await axios.post(
        joinGroup,
        {
          room: grpName,
          user: user.username,
        },
        { withCredentials: true }
      );
      if (res.data?.error) {
        console.log("Failed to create a room");
        return;
      }
      setChatgrps((p) => [...p, grpName]);
    } catch (err) {
      console.log(err);
    }
  };

  const createHandler = async () => {
    if (grpName === "") return;
    try {
      const res = await axios.post(
        createGrp,
        {
          room: grpName,
          user: user.username,
        },
        { withCredentials: true }
      );
      console.log(await res.data)
      if (res.data?.error) {
        console.log("Failed to create a room");
        return;
      }
      setChatgrps((p) => [...p, grpName]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedClass = (grp) => {
    return room.split("+").includes(grp)
      ? "bg-primary text-white hover:bg-primary/[.9]"
      : "bg-white hover:bg-zinc-200";
  };

  return (
    <ScrollArea className="h-[calc(100vh-6rem)] border rounded-md p-2">
      <div className="flex gap-2 max-xl:flex-col">
        <Input
          type="text"
          placeholder="Room Name"
          value={grpName}
          onChange={(e) => setGrpName(e.target.value)}
        />
        <div className="flex gap-2 pb-2">
          <Button onClick={() => joinGrp()}>
            <IoMdAdd /> Join
          </Button>
          <Button onClick={() => createHandler()}>
            <MdAddToPhotos /> Create
          </Button>
        </div>
      </div>
      <hr className="pt-2" />
      {grps?.length > 0 ? (
        grps.map((grp, index) => {
          return (
            <div
              className={`p-2 mt-2 rounded-md hover:cursor-pointer border ${selectedClass(
                grp
              )}`}
              key={index}
              onClick={() => setSelectGrp(grp)}
            >
              <p className="text-left font-[500]">{grp}</p>
            </div>
          );
        })
      ) : (
        <>You haven't joined any rooms</>
      )}
    </ScrollArea>
  );
}

export default Groups;
