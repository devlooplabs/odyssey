import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";

const items = [
  {
    title: "Lives",
    path: "/lives",
    segment: "lives",
  },
  {
    title: "Cursos",
    path: "#",
    segment: "cursos",
  },
  {
    title: "Podcasts",
    path: "#",
    segment: "podcasts",
  },
  {
    title: "Ebooks",
    path: "#",
    segment: "ebooks",
  },
  {
    title: "Séries",
    path: "/series",
    segment: "series",
  },
  {
    title: "Comunidade",
    path: "#",
    segment: "community",
  },
  {
    title: "Planos",
    path: "/plans",
    segment: "plans",
  },
];

export function Menu() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="mr-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            <Link
              href="/"
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Home
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="space-x-8">
          {items.map((item) => (
            <NavigationMenuItem key={item.path}>
              <Link href={item.path} passHref legacyBehavior>
                <NavigationMenuLink>{item.title}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
