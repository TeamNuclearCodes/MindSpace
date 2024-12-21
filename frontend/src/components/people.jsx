import React from "react";
import { groups } from "@/constants/data";
import moment from "moment";
import Image from "next/image";

function People() {
  return (
    <div className="flex flex-col items-start bg-white rounded-[20px] p-3  justify-start px-5 text-3xl shadow-blue-glow font-roboto gap-6 h-full overflow-hidden">
      <p className="font-bold ">People</p>
      <div className="w-full flex gap-2 flex-col custom-scrollbar overflow-x-scroll pr-2 flex-grow">
        {groups.map((group, index) => {
          const givenTime = moment(group.last_msg.time);
          const now = moment();
          return (
            <div key={index}>
              {index != 0 && (
                <div className="min-h-[1px] bg-[#B4ABAB] w-full mb-2" />
              )}
              <div className="flex gap-5 relative w-full" key={index}>
                <Image src={group.profile} alt="" className="w-12 h-12" />
                <div className="min-w-fit">
                  <p className="text-base font-semibold leading-[20px]">
                    {group.name}
                  </p>
                  <p className="text-lg font-light leading-[20px]">
                    {group.last_msg.content.slice(0, 15)}
                  </p>
                </div>
                <div className="w-full flex items-end flex-col justify-center gap-2">
                  <p className="text-lg font-light leading-[20px] text-[#7C7C7C] left-0 text-right">
                    {givenTime.isSame(now, "day")
                      ? givenTime.format("HH:mm A")
                      : givenTime.isSame(now.clone().subtract(1, "day"), "day")
                      ? "Yesterday"
                      : givenTime.isAfter(
                          now.clone().subtract(7, "days"),
                          "day"
                        )
                      ? givenTime.format("dddd")
                      : givenTime.format("MM/DD/YYYY")}
                  </p>
                  {group.unread > 0 ? (
                    <div className="bg-[#F24E1E] rounded-full w-4 h-4 font-light text-white flex justify-center items-center text-base font-sans mr-2">
                      {group.unread}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default People;
