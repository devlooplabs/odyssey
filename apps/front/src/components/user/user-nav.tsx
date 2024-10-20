"use client";

import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../auth/auth-context";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { P } from "../typography/texts";

export const UserNav: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  console.log("user", user);

  if (!user)
    return (
      <>
        <Button
          variant="outline"
          onClick={() => router.push("/login")}
          className="rounded-3xl px-6 uppercase"
        >
          Login
        </Button>
        <Button
          className="rounded-3xl px-6 font-semibold"
          onClick={() => router.push("/signup")}
        >
          Faça Parte
        </Button>
      </>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-3">
              <div>
                <P className="font-semibold">{user.username}</P>
                <P size="xs">{user.email}</P>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/plans")}
            className="cursor-pointer"
            role="button"
          >
            Upgrade
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/account")}
            className="cursor-pointer"
            role="button"
          >
            Minha Conta
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer"
          role="button"
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
