"use server";

import qs from "qs";
import { getOdysseyClient } from "../client";
import { MediaContentType, MediaType, OdysseyBaseResponse, OdysseyFindResponse } from "../types";
import { Course, CourseLesson, CourseModule, CourseSubmodule } from "./types";
import { getVideoFrameUrl } from "../cdn";

export async function findCourse(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/courses/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<Course>>(url);
  return res.data;
}

interface FindCoursesProps {
  count?: number;
}

export async function findCourses({ count }: FindCoursesProps) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: {
        thumbnail: true,
      },
      sort: ["number"],
    },
    { encodeValuesOnly: true }
  );
  const url = `/api/courses?${query}`;
  const res = await client.get<OdysseyFindResponse<Course[]>>(url);
  return res.data;
}

export async function findCourseModule(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: "thumbnail",
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/course-modules/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<CourseModule>>(url);
  return res.data;
}

interface FindCourseModulesProps {
  courseId?: string;
  limit?: number;
}

export async function findCourseModules({
  courseId,
  limit,
}: FindCourseModulesProps) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      filters: courseId
        ? { course: { documentId: { $eq: courseId } } }
        : undefined,
      sort: ["number"],
      populate: "thumbnail",
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/course-modules?${query}`;
  const res = await client.get<OdysseyFindResponse<CourseModule[]>>(url);
  return res.data;
}

export async function findCourseSubmodule(id: string) {
  const client = getOdysseyClient();
  const query = qs.stringify(
    {
      populate: "thumbnail",
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/course-submodules/${id}?${query}`;
  const res = await client.get<OdysseyFindResponse<CourseModule>>(url);
  return res.data;
}

interface FindCourseSubmobules {
  moduleId?: string;
  limit?: number;
}

export async function findCourseSubmodules({
  moduleId,
  limit,
}: FindCourseSubmobules) {
  const client = getOdysseyClient();
  const filters: any = {}; // Use an object to build the filters dynamically

  if (moduleId) {
    filters.module = { documentId: { $eq: moduleId } };
  }

  const query = qs.stringify(
    {
      filters: Object.keys(filters).length ? filters : undefined,
      sort: ["number"],
      populate: "thumbnail",
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/course-submodules?${query}`;
  const res = await client.get<OdysseyFindResponse<CourseSubmodule[]>>(url);

  return res.data;
}

interface FindCourseLessons {
  submoduleId?: string;
  limit?: number;
}
export async function findCourseLessons({
  submoduleId,
  limit,
}: FindCourseLessons) {
  const client = getOdysseyClient();
  const filters: any = {}; // Use an object to build the filters dynamically

  if (submoduleId) {
    filters.submodule = { documentId: { $eq: submoduleId } };
  }

  const query = qs.stringify(
    {
      filters: Object.keys(filters).length ? filters : undefined,
      sort: ["number"],
      populate: "thumbnail",
      pagination: limit ? { limit } : undefined,
    },
    { encodeValuesOnly: true }
  );

  const url = `/api/course-lessons?${query}`;
  const res = await client.get<OdysseyFindResponse<CourseSubmodule[]>>(url);

  return res.data;
}

export async function watchCourseLesson(id: string) {
  const client = getOdysseyClient();

  let res = await client.get<OdysseyBaseResponse<CourseLesson>>(
    `/api/course-lessons/${id}/watch`
  );

  // If user doesn't have access to watch, fetch the episode metadata.
  if (res.status === 403) {
    res = await client.get<OdysseyBaseResponse<CourseLesson>>(
      `/api/course-lessons/${id}?populate=thumbnail`
    );
    return { ...res.data, hasAccess: false };
  }

  if (res.data.data) {
    res.data.data.type = MediaContentType.video;
    res.data.data.video.provider_metadata.url = await getVideoFrameUrl(
      res.data.data.video
    );
  }

  return { ...res.data, hasAccess: true };
}
