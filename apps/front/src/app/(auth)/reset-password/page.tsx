import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "./reset-password-form";

export default function SignUp() {
  return (
    <Card className="border-none py-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Escolha uma nova senha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}
