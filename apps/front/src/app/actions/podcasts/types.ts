import { MediaType, OdysseyImageFile } from "../types";

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

export interface Podcast {
  id: number;
  documentId: string;
  name: string;
  thumbnail: OdysseyImageFile;
  mediaType: MediaType;
  description?: string;
  host?: string;
  schedule?: string;
  dayOfWeek?: WeekDays;
}
