import axios, { AxiosInstance } from "axios";
import qs from "qs";
import {
  ActivateMembershipParams,
  User,
  Membership,
  Plan,
  StrapiFindResponse,
  RegisterUserParams,
  GetTokenParams,
  TokenResult,
  Serie,
  SerieEpisode,
  SerieSeason,
} from "./types";

export class Odyssey {
  private token?: string | null;
  private client: AxiosInstance;

  constructor(token?: string) {
    this.token = token;
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ODYSSEY_STRAPI_BASE_URL!,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use((config) => {
      if (this.token) config.headers.Authorization = `Bearer ${this.token}`;
      return config;
    });
  }

  async getSeries() {
    const url = `/api/series?populate=thumbnail`;
    const res = await this.client.get<StrapiFindResponse<Serie[]>>(url);
    return res.data;
  }

  async getSerie(id: string) {
    const query = qs.stringify(
      {
        populate: {
          thumbnail: true, // Populate series' thumbnail
          seasons: {
            populate: "thumbnail", // Populate each season's thumbnail
          },
        },
      },
      { encodeValuesOnly: true } // Ensure only values are URL-encoded
    );

    const url = `/api/series/${id}?${query}`;
    const res = await this.client.get<StrapiFindResponse<Serie>>(url);
    return res.data;
  }

  async getEpisode(id: string) {
    const query = qs.stringify(
      {
        populate: {
          thumbnail: true, // Populate the episode's thumbnail
          video: true, // Populate the episode's video
        },
      },
      { encodeValuesOnly: true } // Ensure only values are URL-encoded
    );

    const url = `/api/serie-episodes/${id}?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieEpisode>>(url);
    return res.data;
  }

  async getSerieEpisodes(serieId?: string, count?: number) {
    const query = qs.stringify(
      {
        filters: serieId ? { serie: { id: { $eq: serieId } } } : undefined,
        sort: ["publishedAt:desc"], // Sort by publishAt in descending order
        populate: "thumbnail", // Populate the thumbnail field
        pagination: count ? { limit: count } : undefined, // Apply limit if provided
      },
      { encodeValuesOnly: true } // Ensure only values are URL-encoded
    );

    const url = `/api/serie-episodes?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieEpisode[]>>(url);
    return res.data;
  }

  async getSerieSeason(id: string) {
    const query = qs.stringify(
      {
        populate: {
          thumbnail: true, // Populate season's thumbnail
          episodes: {
            populate: "thumbnail", // Populate each episode's thumbnail
          },
          serie: {
            fields: ["id", "name", "description"], // Fetch only id, name, and description of the associated series
          },
        },
      },
      { encodeValuesOnly: true } // Ensure only values are URL-encoded
    );

    const url = `/api/serie-seasons/${id}?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieSeason>>(url);
    return res.data;
  }

  async getSerieSeasons(serieId?: string, count?: number) {
    const query = qs.stringify(
      {
        filters: serieId ? { serie: { id: { $eq: serieId } } } : undefined,
        sort: ["sequence"], // Sort by publishAt in descending order
        populate: "thumbnail", // Populate the thumbnail field
        pagination: count ? { limit: count } : undefined, // Apply limit if provided
      },
      { encodeValuesOnly: true } // Ensure only values are URL-encoded
    );

    const url = `/api/serie-seasons?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieSeason[]>>(url);
    return res.data;
  }

  async getMe() {
    const query = qs.stringify({ populate: ["role", "membership"] });
    const url = `/api/users/me?${query}`;
    const res = await this.client.get<User>(url);
    return res.data;
  }

  async getPlans() {
    const url = "/api/plans?populate=options";
    const res = await this.client.get<StrapiFindResponse<Plan[]>>(url);
    return res.data;
  }

  async getPlan(docId: string) {
    const url = `/api/plans/${docId}?populate=options`;
    const res = await this.client.get<StrapiFindResponse<Plan>>(url);
    return res.data;
  }

  async register(params: RegisterUserParams) {
    const url = "/api/auth/local/register";
    const res = await this.client.post<TokenResult>(url, params);
    return res.data;
  }

  async getToken(params: GetTokenParams) {
    const url = "/api/auth/local";
    const res = await this.client.post<TokenResult>(url, params);
    return res.data;
  }

  async activateMembership(
    userDocId: string,
    params: ActivateMembershipParams
  ) {
    const url = `/api/membership/${userDocId}/activate`;
    const res = await this.client.put<Membership>(url, params);
    return res.data;
  }

  async revokeMembership(userDocId: string) {
    const url = `/api/membership/${userDocId}/revoke`;
    const res = await this.client.put<Membership>(url, {});
    return res.data;
  }

  async revokeGatewayMembership(gatewayId: string) {
    const url = `/api/membership/${gatewayId}/revoke-gateway`;
    const res = await this.client.put<Membership>(url, {});
    return res.data;
  }
}
