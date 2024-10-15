export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container grid min-h-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium gap-2">
          Alta Linguagem
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              A maior plataforma de conteúdo intelectual do Brasil
            </p>
            <p className="text-lg">
              Una entretenimento com estudos em um só lugar.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="flex flex-col justify-center items-center text-lg font-semibold mb-4 lg:hidden">
          Alta linguagem
        </div>
        <div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
