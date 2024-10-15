import { Button } from "@/components/ui/button";
import { base_url_server, fetcher, useLocalStorage } from "@/lib/utils";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function sendRequest(url: string) {
  return await axios.post(url);
}

const Header = () => {
  const { removeFromLocalStorage } = useLocalStorage();
  const router = useRouter();
  const { trigger } = useSWRMutation(
    `/api/auth/remove-token`,
    sendRequest,
    {
      onError(e){
        console.log(`Error in logout`,e);
      },
      onSuccess() {
        removeFromLocalStorage('token')
        router.push("/sign-in");
      },
    }
  );
  return (
    <div className="w-full h-20 flex items-center justify-end  ">
      <Button onClick={() => trigger()}>
        <LogOut className="mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default Header;
