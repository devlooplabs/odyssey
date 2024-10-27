import Link from "next/link";

export function Footer() {
  const linkCls = "underline hover:text-primary";

  return (
    <footer className="py-6 md:px-8 md:py-8 border-t mt-8">
      <div className="container flex justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Link href="/faq" className={linkCls} prefetch={false}>
              Dúvidas frequentes
            </Link>
            <Link href="/terms" className={linkCls} prefetch={false}>
              Termos de uso
            </Link>
            <Link href="/account" className={linkCls} prefetch={false}>
              Conta
            </Link>
            <Link href="/contact" className={linkCls} prefetch={false}>
              Contato
            </Link>
          </div>
          <div className="">
            <Link
              href="https://wa.me/32999465598?text=Olá"
              className={linkCls}
              prefetch={false}
            >
              Whatsapp: (32) 9 9946-5598
            </Link>
          </div>
        </div>
        <div className="self-end">
          <h1 className="text-xl">Universo Alta Linguagem</h1>
        </div>
      </div>
    </footer>
  );
}
