enum PageEnum {
  Home = "Home",
  Login = "Login",
  Register = "Register",
  Subscriptions = "Subscriptions",
  You = "You",
  Publish = "Publish",
  TrackAnime = "TrackAnime",
}

const pagePathanmeMap: Record<PageEnum, string> = {
  [PageEnum.Home]: "/home",
  [PageEnum.Login]: "/login",
  [PageEnum.Register]: "/register",
  [PageEnum.Subscriptions]: "/subscriptions",
  [PageEnum.You]: "/you",
  [PageEnum.Publish]: "/publish",
  [PageEnum.TrackAnime]: "/track-anime",
} as unknown as Record<PageEnum, string>;

const pathnamePageMap: Record<string, PageEnum> = {};

Object.entries(pagePathanmeMap).forEach(([key, value]) => {
  pathnamePageMap[value] = key as unknown as PageEnum;
});

export { pagePathanmeMap, pathnamePageMap, PageEnum };
