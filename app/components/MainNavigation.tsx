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
        <BottomNavigationAction label="Home" value={PageEnum.Home} />
        <BottomNavigationAction label="Fun" value={PageEnum.TrackAnime} />
        <BottomNavigationAction
          icon={<AddBoxOutlined />}
          value={PageEnum.Publish}
        />
        <BottomNavigationAction label="All" value={PageEnum.Subscriptions} />
        <BottomNavigationAction label="You" value={PageEnum.You} />
      </BottomNavigation>
    </Paper>
  );
}
