"use client";
import { useAuth } from "@/context/authContext";
import LandingCard from "./LandingCard";

const page = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-center container m-auto mt-2">
      <div className="flex flex-col w-full">
        <h2 className="text-xl text-left mb-4 mt-2">
          Welcome <span className="text-zinc-500">{user?.username}</span>
        </h2>
        <div className="flex gap-3">
          <LandingCard
            text="Talk with an AI Therapist"
            link="/app/chatwithai"
            desc="Engage in confidential conversations with an AI-powered therapist for
          mental health support, self-reflection, or guidance at your
          convenience."
          />
          <LandingCard
            text="Public Chat Rooms"
            link="/app/room"
            desc="Connect with others in open forums to discuss a wide range of topics, share ideas, and engage in community discussions."
          />
          <LandingCard
            text="Talk with a Therapist"
            link="/app/room"
            desc="Have one-on-one sessions with a licensed therapist for personalized, professional mental health care and support."
          />
        </div>
      </div>
    </div>
  );
};

export default page;
