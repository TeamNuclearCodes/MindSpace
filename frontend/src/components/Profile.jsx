import React, { useState } from "react";
import Image from "next/image";
import dp from "@/assets/sidebar/dp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Profile({ user }) {
  const [username, setUsername] = useState(user.username);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user.image || dp);

  const imageUpload = () => {}

  return (
    <div className="shadow-blue-glow w-full h-full bg-white rounded-[20px] p-5 flex justify-around items-center ">
      <div className="relative flex flex-col gap-3">
        <Image
          src={preview}
          className=" rounded-[100%] w-80 h-80 relative"
          alt="profilPic"
          layout="intrinsic"
          width={500} 
          height={300} 
        />
        <input
          type="file"
          className="hidden"
          id="profilePic"
          accept="image/png, image/jpeg, image/jpg"
          onInput={(e) => {
            setProfilePic(e.target.files[0]);
            const previewUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(previewUrl);
            console.log(previewUrl);
          }}
        />
        <label
          htmlFor="profilePic"
          className="bg-[#EFF6FC] rounded-full p-2 flex justify-center items-center max-w-fit cursor-pointer absolute bottom-16 right-5 shadow-blue-glow"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ color: "#6e00ff" }}
            size="2xl"
          />
        </label>

        <div className="flex gap-3 justify-center">
          <button
            className="rounded-lg bg-red-700 text-white p-2 px-4"
            onClick={() => {
              setProfilePic(null);
              setPreview(user.image || dp);
            }}
          >
            Reset
          </button>
          <button
            className="rounded-lg bg-white text-black border-black border px-4 p-2"
            onClick={imageUpload}
          >
            Save
          </button>
        </div>
      </div>
      <div className="w-[1px] min-h-full  bg-[#B4ABAB]" />
      <div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            contentEditable="false"
            value={username}
          />
          <button>edit</button>
          <button>save</button>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            is="email"
            type="text"
            contentEditable="false"
            value={user.email}
          />
          <button>edit</button>
          <button>save</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
