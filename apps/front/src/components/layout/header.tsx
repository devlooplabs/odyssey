"use client";
import { Button } from "../ui/button";
import { Menu } from "./menu";
import { ModeToggle } from "./mode-toggle";
import { SearchBar } from "./search-bar";
import { UserNav } from "./user-nav";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-center gap-8">
        <Button variant="link" onClick={() => router.push("/")} className="hidden lg:flex">
          <Image src={logo} alt="Home" width={90} height={90} />
        </Button>
        <Menu />
        <div className="flex items-center justify-between space-x-2">
          {/* <SearchBar /> */}
          {/* <ModeToggle /> */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
