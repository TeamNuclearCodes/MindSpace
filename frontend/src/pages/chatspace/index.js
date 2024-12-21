import ChatSpace from "@/components/chatSpace";
import Sidebar from "@/components/sidebar";
import NavMenu from "@/components/navMenu";
import { useAuth } from "@/context/authContext";

function ChatPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-row w-screen h-screen gap-10 p-10 bg-[#EFF6FC]">
      <Sidebar user={user} />
      <NavMenu />
      <ChatSpace />
    </div>
  );
}

export default ChatPage;
