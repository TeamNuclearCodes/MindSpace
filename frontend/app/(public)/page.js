import { Button } from "@/components/ui/button";
import LandingCard from "./LandingCard";

const page = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-center items-center flex-col min-h-screen container m-auto">
        <div className="flex text-bold text-left gap-2 font-foldit">
          <h1 className="text-9xl mb-10 inline-block text-black">
            <span className="text-primary">Mind</span>
            <br />
            Space
          </h1>
          <div className="flex items-center text-right flex-col gap-2">
            <h2 className="text-7xl max-w-[900px] leading-[85px]">
              Care Your Way
              <br />
              <span className="text-violet-400">AI</span>,{" "}
              <span className="text-yellow-600">Community</span>, and{" "}
              <span className="text-teal-600">Professional Support</span>.
            </h2>
          </div>
        </div>

        <a href="http://localhost:3001/api/auth/google">
          <Button size="lg" className="mt-10">
            Login in with Google
          </Button>
        </a>

        <div className="flex justify-center gap-10 mt-24">
          <LandingCard
            text="Talk with an AI Therapist"
            desc="Engage in confidential conversations with an AI-powered therapist for
          mental health support, self-reflection, or guidance at your
          convenience."
          />
          <LandingCard
            text="Public Chat Rooms"
            desc="Connect with others in open forums to discuss a wide range of topics, share ideas, and engage in community discussions."
          />
          <LandingCard
            text="Talk with a Therapist"
            desc="Have one-on-one sessions with a licensed therapist for personalized, professional mental health care and support."
          />
        </div>
      </div>
    </div>
  );
};

export default page;
