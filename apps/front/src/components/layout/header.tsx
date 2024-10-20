"use client";

import { UserNav } from "../user/user-nav";
import { Menu } from "./menu";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between gap-8">
        <Menu />
        <div className="flex items-center space-x-2">
          {/* <SearchBar /> */}
          {/* <ModeToggle /> */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
