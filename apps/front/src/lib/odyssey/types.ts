interface StrapiBaseResponse<T> {
  data: T | null;
  error?: StrapiError;
}

interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}

export interface StrapiFindResponse<T> extends StrapiBaseResponse<T> {
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/* Users */
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

export type RoleType = "public" | "authenticated" | "member";

export interface Role {
  documentId: string;
  name: string;
  description: string;
  type: RoleType;
}

export interface RegisterUserParams {
  username: string;
  password: string;
  email: string;
}

export interface GetTokenParams {
  identifier: string;
  password: string;
}

export interface TokenResult extends StrapiBaseResponse<null> {
  jwt: string;
  user: User;
}

/* Payments */
export enum PaymentGateways {
  stripe = "stripe",
  mercadopago = "mercadopago",
}

export interface Plan {
  documentId: string;
  name: string;
  features?: string;
  valueText: string;
  valueDescription?: string;
  options: PlanPaymentOption[];
}

export interface PlanPaymentOption {
  documentId: string;
  gateway: PaymentGateways;
  data: any;
}

/* Memberships */
export interface ActivateMembershipParams {
  gateway: PaymentGateways;
  gatewayId?: string;
  gatewayData?: Record<string, any>;
}

export interface Membership {
  active: boolean;
  gateway: PaymentGateways;
  gatewayId?: string;
  gatewayData?: Record<string, any>;
}

/* Content */
export enum MediaType {
  serie = "serie",
}

export interface Media {
  id: number;
  documentId: string;
  type: MediaType;
  name: string;
  createdAt: string;
  publishedAt: string;
  description?: string;
  thumbnail?: OdysseyImageFile;
}

export enum MediaContentType {
  video = "video",
}

export interface MediaContent {
  id: number;
  documentId: string;
  createdAt: string;
  publishedAt: string;
  name: string;
  description?: string;
  thumbnail?: OdysseyImageFile;
}

/* Series */
export interface Serie extends Media {
  type: MediaType.serie;
  seasons?: SerieSeason[];
}

export interface SerieSeason {
  id: number;
  documentId: string;
  name: string;
  sequence: number;
  description: string;
  publishedAt: string;
  thumbnail?: OdysseyImageFile;
  serie?: Serie;
  episodes?: SerieEpisode[];
}

export interface SerieEpisode extends MediaContent {
  type: MediaContentType.video,
  video: OdysseyVideoFile;
}

/* Files */
interface OdysseyFile {
  id: number;
  documentId: string;
  mime: string;
  url: string;
}

export interface OdysseyVideoFile extends OdysseyFile {
  provider_metadata: {
    guid: string;
  };
}

export interface OdysseyImageFile extends OdysseyFile {
  formats: OdysseyImageFormats;
}

interface OdysseyImageFormats {
  large: OdysseyImageFormat;
  small: OdysseyImageFormat;
  medium: OdysseyImageFormat;
  thumbnail: OdysseyImageFormat;
}

interface OdysseyImageFormat {
  url: string;
}
