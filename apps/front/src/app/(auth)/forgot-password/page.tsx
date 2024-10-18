import { P } from "@/components/typography/texts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function SignIn() {
  return (
    <Card className="border-none py-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Recupere sua senha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="justify-center flex-col space-y-4">
        <P size="sm">Um link de recuperação será enviado para o seu e-mail.</P>
        <P size="sm">
          <Link href="/login">Fazer login.</Link>
        </P>
      </CardFooter>
    </Card>
  );
}
