import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "./reset-password-form";

export default async function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return (
    <Card className="border-none py-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Escolha uma nova senha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm code={searchParams.code} />
      </CardContent>
    </Card>
  );
}
