/* eslint-disable @typescript-eslint/no-empty-object-type */

export enum ContentType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}

export enum ItemType {
  COMIC = "COMIC",
  ANIME = "ANIME",
}

export interface IPostContent {
  type: ContentType;
  content: string;
}

export interface IPageInfo {
  page: number;
  pageSize: number;
  skip: number;
  limit: number;
}

export interface IProgress {
  id: string;
}
export interface ISubItem extends IProgress {
  name: string;
}

export interface IEpisode extends ISubItem {}

export interface IChapters extends ISubItem {}

export interface IItem {
  _id?: string;
  type: ItemType;
  name: string;
  desc: string;
  thumbnail?: string;
}

export interface IAnime extends IItem {
  episodes: IEpisode[];
}

export interface IComic extends IItem {
  chapters: IChapters[];
}
