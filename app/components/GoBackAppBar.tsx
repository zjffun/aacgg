"use client";

import { useRouter } from "@/hooks/useNavRouter";
import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const GoBackAppBar = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={router.back}
          aria-label="back"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default GoBackAppBar;
