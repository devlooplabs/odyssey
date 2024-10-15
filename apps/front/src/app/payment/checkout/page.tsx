"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CircleCheckBig, CircleSlash2, Clock } from "lucide-react";
import {
  Card as BaseCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Card = motion.create(BaseCard);

type CheckoutStatus = "pending" | "failure" | "success";

const statusDetails = {
  pending: {
    renderIcon: () => <Clock className="w-16 h-16" />,
    title: "Processando pagamento",
    message:
      "Em alguns instantes você será redirecionado para realizar o pagamento da sua assinatura",
    link: null,
  },
  success: {
    renderIcon: () => <CircleCheckBig className="w-16 h-16" />,
    title: "Pagamento recebido!",
    message:
      "Obrigado pela confiança, em alguns instantes você será redicionado para a plataforma.",
    link: {
      text: "Acessar plataforma",
      path: "/",
    },
  },
  failure: {
    renderIcon: () => <CircleSlash2 className="w-16 h-16" />,
    title: "Pagamento não efetuado",
    message:
      "Ocorreu um problema ao processar o seu pagamento, você pode tentar novamente na página de pagamentos.",
    link: {
      path: "/subscription/payment",
      text: "Ir para pagamentos",
    },
  },
};

const CheckoutStatusPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let status = searchParams.get("status") as CheckoutStatus;
  if (status == null) status = "pending";

  const redirectUrl = searchParams.get("redirectUrl") as string;

  const { renderIcon, title, message, link } = statusDetails[status];

  useEffect(() => {
    if (status === "pending") {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);
    }
    if (status === "success") {
      setTimeout(() => {
        router.push(statusDetails.success.link.path);
      }, 5000);
    }
  }, [status, router, redirectUrl]);

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-center">{renderIcon()}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p>{message}</p>
      </CardContent>
      {link && (
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => router.push(link.path)}>
            {link.text}
          </Button>
        </CardFooter>
      )}
    </>
  );
};

export default CheckoutStatusPage;
