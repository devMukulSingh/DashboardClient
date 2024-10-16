import dynamic from "next/dynamic";
import { ReactNode } from "react";
const Header = dynamic(() => import("./components/Header"), { ssr: false });

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-[35rem]">
      <Header />
      {children}
    </div>
  );
}
