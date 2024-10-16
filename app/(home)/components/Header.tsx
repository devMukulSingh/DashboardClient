'use client'
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
async function sendRequest(url: string) {
  return await axios.post(url);
}

const Header = () => {
  const { removeFromLocalStorage, getFromLocalStorage } = useLocalStorage();
  const user = getFromLocalStorage("user");
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/sign-in");
    removeFromLocalStorage("user");
  };
  return (
    <div className="w-full h-20 flex items-center justify-between border shadow-md bg-white sticky top-0 z-50 p-3 sm:p-5 ">
      <h1 className="text-lg sm:text-2xl">Welcome {user.name}</h1>
      <Button onClick={handleLogout}>
        <LogOut className="sm:mr-2" />
        <h1 className="sm:block hidden">
        Logout
        </h1>
      </Button>
    </div>
  );
};

export default Header;
