import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Footer } from "@/components/layout/footer";
import { MemberProvider } from "@/components/members/member-provider";

export const metadata: Metadata = {
  title: "Alta Linguagem",
  description: "Assista a conteúdos exclusivos do seu programa favorito!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MemberProvider>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </MemberProvider>
  );
}
