import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[url('/images/texture.svg')] bg-black">
      <div className="bg-gradient-to-b from-background to-background/30">
        <header className="fixed top-0 z-50 w-full border-b">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className="justify-self-center"
              width={80}
              draggable={false}
            />
          </Link>
        </header>
        <div className="container flex flex-col relative min-h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:max-w-[500px] flex-grow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
