import Navbar from "@/components/Navbar";
export default function RootLayout({ children }) {
  return (
    <div className="flex justify-center container m-auto">
      <div className="flex flex-col w-full">
        <div className="border-b">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  );
}
