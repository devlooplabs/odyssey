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

    this.client.interceptors.response.use(null, (error) => {
      if (error.response && error.response.status === 400) {
        return Promise.resolve(error.response);
      }

      return Promise.reject(error);
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
          thumbnail: true,
          seasons: {
            populate: "thumbnail",
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const url = `/api/series/${id}?${query}`;
    const res = await this.client.get<StrapiFindResponse<Serie>>(url);
    return res.data;
  }

  async getEpisode(id: string) {
    const query = qs.stringify(
      {
        populate: {
          thumbnail: true,
          video: true,
        },
      },
      { encodeValuesOnly: true }
    );

    const url = `/api/serie-episodes/${id}?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieEpisode>>(url);
    return res.data;
  }

  async getSerieEpisodes(serieId?: string, count?: number) {
    const query = qs.stringify(
      {
        filters: serieId ? { serie: { id: { $eq: serieId } } } : undefined,
        sort: ["publishedAt:desc"],
        populate: "thumbnail",
        pagination: count ? { limit: count } : undefined,
      },
      { encodeValuesOnly: true }
    );

    const url = `/api/serie-episodes?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieEpisode[]>>(url);
    return res.data;
  }

  async getSerieSeason(id: string) {
    const query = qs.stringify(
      {
        populate: {
          thumbnail: true,
          episodes: {
            populate: "thumbnail",
          },
          serie: {
            fields: ["id", "name", "description"],
          },
        },
      },
      { encodeValuesOnly: true }
    );

    const url = `/api/serie-seasons/${id}?${query}`;
    const res = await this.client.get<StrapiFindResponse<SerieSeason>>(url);
    return res.data;
  }

  async getSerieSeasons(serieId?: string, count?: number) {
    const query = qs.stringify(
      {
        filters: serieId ? { serie: { id: { $eq: serieId } } } : undefined,
        sort: ["sequence"],
        populate: "thumbnail",
        pagination: count ? { limit: count } : undefined,
      },
      { encodeValuesOnly: true }
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
