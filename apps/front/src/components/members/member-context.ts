import { createContext, useContext } from "react";

interface SubscribeProps {
}

export const MemberContext = createContext<SubscribeProps | undefined>(
  undefined
);

export const useMember = (): SubscribeProps => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMember must be used within an MemberProvider");
  }
  return context;
};
