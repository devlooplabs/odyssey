import { Plan } from "../plans/types";
import { OdysseErrorResponse, OdysseyBaseResponse } from "../types";

export interface User {
  id: number;
  documentId: string;
  blocker: boolean;
  confirmed: boolean;
  email: string;
  username: string;
  role: Role;
  member: boolean;
  plan: Plan;
  notifications: any | null;
}

export enum RoleType {
  public = "public",
  authenticated = "authenticated",
  member = "member",
}

export interface Role {
  documentId: string;
  name: string;
  description: string;
  type: RoleType;
}

export interface TokenResult extends OdysseErrorResponse {
  jwt: string;
  user: User;
}

export interface ForgotPasswordResult extends OdysseErrorResponse {
  ok: boolean;
}
