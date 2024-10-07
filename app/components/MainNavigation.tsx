"use client";

import { AddBoxOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { PageEnum, pagePathanmeMap, pathnamePageMap } from "../common/pages";

export default function MainNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const firstPathName = `/${pathname.split("/")[1]}`;
  const currentPage = pathnamePageMap[firstPathName];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentPage}
        onChange={(event, newValue) => {
          const newHerf = pagePathanmeMap[newValue as PageEnum];
          if (newHerf) {
            router.push(newHerf);
          }
        }}
      >
        <BottomNavigationAction label="首页" value={PageEnum.Home} />
        <BottomNavigationAction label="追番" value={PageEnum.TrackAnime} />
        <BottomNavigationAction
          icon={<AddBoxOutlined />}
          value={PageEnum.Publish}
        />
        <BottomNavigationAction label="关注" value={PageEnum.Subscriptions} />
        <BottomNavigationAction label="我的" value={PageEnum.You} />
      </BottomNavigation>
    </Paper>
  );
}
