import { IAnime, IComic, ItemType } from "../types";

export default function getSubItems(item?: IAnime | IComic) {
  if (item?.type === ItemType.ANIME) {
    const _item = item as IAnime;
    return _item.episodes || [];
  } else if (item?.type === ItemType.COMIC) {
    const _item = item as IComic;
    return _item.chapters || [];
  }

  return [];
}
