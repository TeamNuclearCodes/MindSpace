import React from "react";
import search from "@/assets/Search.png";
import Image from "next/image";

function SearchBar() {
  return (
    <div className="flex bg-white rounded-[20px] font-roboto p-2 items-center gap-3 px-5 text-[#7C7C7C] text-2xl shadow-blue-glow">
      <Image src={search} alt="" />
      <input type="text" className="outline-none" placeholder="Search" />
    </div>
  );
}

export default SearchBar;
