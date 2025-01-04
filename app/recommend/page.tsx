"use client";

import { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import localFont from "next/font/local";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/services/fetcher";
import { IItem } from "../types";
import Image from "next/image";
import getImageUrl from "../common/getImageUrl";

import "./cyberpunk.css";
import styles from "./page.module.css";

// Initialize the local font
const cyberpunkFont = localFont({
  src: "../fonts/Cyberpunk.ttf",
  variable: "--font-cyberpunk",
});

function Content() {
  const param = useSearchParams();
  const userLogin = param.get("name");

  const { isLoading, error, data } = useSWR<{
    items: IItem[];
  }>(`/api/get-recommend/${userLogin}`, fetcher);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const recommendList = data?.items || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="cyber-razor-bottom">
          <Typography
            variant="h4"
            className={cyberpunkFont.className}
            sx={{
              p: 2,
              pb: 1,
              color: "var(--black)",
              textShadow:
                "var(--cyan-cyberpunk-font1) 1px 1px, var(--cyan-cyberpunk-font2) 2px 2px",
              textTransform: "uppercase",
            }}
          >
            recommend
          </Typography>
        </div>
      </div>

      <Box
        sx={{
          pt: 3,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {recommendList.map((item) => (
              <Grid size={4} key={item._id}>
                <div className="cyber-tile-small fg-dark bg-cyan">
                  <Image
                    src={getImageUrl(item.coverImage)}
                    width={30}
                    height={40}
                    loading="lazy"
                    alt={item.name}
                    style={{
                      width: "100%",
                    }}
                  />
                  <label>{item.name}</label>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <div className={styles.footer}>
        <div className="cyber-razor-top"></div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
