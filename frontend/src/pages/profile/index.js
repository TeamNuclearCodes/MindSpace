import Sidebar from "@/components/sidebar";
import { useAuth } from "@/context/authContext";
import Profile from "@/components/Profile";

function ChatPage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-row w-screen h-screen gap-10 p-10 bg-[#EFF6FC]">
      <Sidebar user={user} />
      <Profile user={user} />
    </div>
  );
}

export default ChatPage;
