import { Card } from "@/components/ui/card";
import { getAuth } from "@/lib/odyssey/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { user } = await getAuth();
  // if (!user) {
  //   return redirect("/signin");
  // }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <Card
          className="text-center w-96"
        >
          {children}
        </Card>
      </div>
    </div>
  );
}
