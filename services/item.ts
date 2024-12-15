import { showToast } from "@/app/components/Toast";
import captureException from "@/utils/captureException";
import poster from "./poster";
import puter from "./puter";

export interface IEpisode {
  id: string;
  name: string;
  watched?: boolean;
}

export interface IChapters {
  id: string;
  name: string;
  watched?: boolean;
}

export enum ItemType {
  COMIC = "COMIC",
  ANIME = "ANIME",
}

export async function createItem(data) {
  try {
    const result = await poster("/api/item", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("创建失败");
    return false;
  }
}

export async function updateItem(data) {
  try {
    const result = await puter("/api/item", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("修改失败");
    return false;
  }
}

export async function markWathcedEpisodes(data) {
  try {
    const result = await puter("/api/mark-watched-episodes", data);

    return result;
  } catch (error) {
    captureException(error);
    return false;
  }
}

export async function addTrackItem(data) {
  try {
    const result = await poster("/api/track-item", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("添加失败");
    return false;
  }
}

export async function removeTrackItem(data) {
  try {
    const result = await poster("/api/remove-track-item", data);

    return result;
  } catch (error) {
    captureException(error);
    showToast("移除失败");
    return false;
  }
}
