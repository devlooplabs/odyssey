import { SignInForm } from "./login-form";
import { P } from "@/components/typography/texts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignIn() {
  return (
    <Card className="border-none py-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Entre com sua conta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="justify-center">
        <P size="sm">
          Novo por aqui? <Link href="/signup">Assine Agora!</Link>
        </P>
      </CardFooter>
    </Card>
  );
}
