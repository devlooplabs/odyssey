import { Membership } from "../memberships/types";
import { OdysseyBaseResponse } from "../types";

export interface User {
  id: number;
  documentId: string;
  blocker: boolean;
  confirmed: boolean;
  email: string;
  username: string;
  role: Role;
  membership?: Membership;
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
export interface TokenResult extends OdysseyBaseResponse<null> {
  jwt: string;
  user: User;
}
