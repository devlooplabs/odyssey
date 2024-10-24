import { Media, MediaContent, MediaContentType, OdysseyImageFile, OdysseyVideoFile } from "../types";

export interface Course {
  id: number;
  documentId: string;
  name: string;
  number: number;
  description?: string;
  thumbnail?: OdysseyImageFile;
  modules?: CourseModule;
}

export interface CourseModule extends Media {
  number: number;
  submodules?: CourseSubmodule[];
}

export interface CourseSubmodule {
  id: number;
  documentId: string;
  name: string;
  number?: number;
  description?: string;
  thumbnail?: OdysseyImageFile;
  lessons?: CourseLesson[];
}

export interface CourseLesson extends MediaContent {
  id: number;
  documentId: string;
  type: MediaContentType.video;
  name: string;
  number?: number;
  description?: string;
  video: OdysseyVideoFile;
}