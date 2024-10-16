import { Card } from "@/components/ui/card";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
