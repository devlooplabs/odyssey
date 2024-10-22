import { MediaType, MediaVideo as VideoMedia, OdysseyImageFile, OdysseyVideoFile, Media } from "../types";

export enum WeekDays {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export const WeekDaysText: Record<WeekDays, string> = {
  monday: "Segunda",
  tuesday: "Terça",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sábado",
  sunday: "Domingo",
};

export interface Podcast extends Media {
  type: MediaType.podcast;
  host?: string;
  schedule?: string;
  dayOfWeek?: WeekDays;
}

export interface PodcastEpisode extends VideoMedia {
  id: number;
  documentId: string;
  podcast?: Podcast;
  name: string;
  description?: string;
  thumbnail: OdysseyImageFile,
  video: OdysseyVideoFile
}
