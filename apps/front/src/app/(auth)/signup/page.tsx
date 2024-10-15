import { SignUpForm } from "./signup-form";

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight hidden lg:block">
          Criar conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Cria sua conta e faça parte do Alta Linguagem!
        </p>
      </div>
      <SignUpForm />
    </>
  );
}
