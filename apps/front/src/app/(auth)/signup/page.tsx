import { P } from "@/components/typography/texts";
import { SignUpForm } from "./signup-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="border-none py-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Cadastre-se agora
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="justify-center">
        <P size="sm">
          Já possui uma conta? <Link href="/login">Faça login!</Link>
        </P>
      </CardFooter>
    </Card>
  );
}
