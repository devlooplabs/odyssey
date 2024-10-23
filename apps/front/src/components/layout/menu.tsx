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
import logo from "../../../public/images/logo.png";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Lives",
    path: "/lives",
    segment: "lives",
  },
  // {
  //   title: "Cursos",
  //   path: "#",
  //   segment: "cursos",
  // },
  // {
  //   title: "Podcasts",
  //   path: "#",
  //   segment: "podcasts",
  // },
  // {
  //   title: "Ebooks",
  //   path: "#",
  //   segment: "ebooks",
  // },
  {
    title: "Podcasts",
    path: "/podcasts",
    segument: "podcasts"
  },
  // {
  //   title: "Séries",
  //   path: "/series",
  //   segment: "series",
  // },
  // {
  //   title: "Comunidade",
  //   path: "#",
  //   segment: "community",
  // },
  {
    title: "Planos",
    path: "/plans",
    segment: "plans",
  },
];

export function Menu() {
  const segment = useSelectedLayoutSegment();
  const mobileLinkCls = "flex w-full items-center py-2 text-lg font-semibold";
  return (
    <div className="mr-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-2 py-6">
            <Link href="/" className={mobileLinkCls}>
              Home
            </Link>
            {items.map((item) => (
              <Link key={item.path} href={item.path} className={mobileLinkCls}>
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="space-x-8">
          <NavigationMenuItem className="hidden md:list-item">
            <Link href="/" passHref legacyBehavior>
              <NavigationMenuLink>
                <Image src={logo} alt="Home" width={90} height={90} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {items.map((item) => (
            <NavigationMenuItem key={item.path}>
              <Link href={item.path} passHref legacyBehavior>
                <NavigationMenuLink
                  className={cn("hover:no-underline", {
                    "text-primary": segment === item.segment,
                  })}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
