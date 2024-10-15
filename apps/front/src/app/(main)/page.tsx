"use client";

import { useAuth } from "@/components/auth/auth-context";
import { Hero } from "./components/hero/hero";
import { Explore } from "./components/explore/expore";

export default function Home() {
  const { isMember } = useAuth();
  return (
    <div className="w-full">
      <Hero />
      <div className="py-16">
        <Explore />
      </div>
    </div>
  );
}
