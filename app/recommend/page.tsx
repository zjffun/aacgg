"use client";

import { Suspense } from "react";
import { Box, Container } from "@mui/material";
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
import classNames from "classnames";

// Initialize the local font
const cyberpunkFont = localFont({
  src: "../fonts/Cyberpunk.ttf",
  variable: "--font-cyberpunk",
});

function Content() {
  const param = useSearchParams();
  const userLogin = param.get("name");
  const screenshot = param.get("screenshot") === "true";

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
          <h1
            className={cyberpunkFont.className}
            style={{
              fontSize: "2.25rem",
              padding: "16px 16px 8px 16px",
              color: "var(--black)",
              textShadow:
                "var(--cyan-cyberpunk-font1) 1px 1px, var(--cyan-cyberpunk-font2) 2px 2px",
              textTransform: "uppercase",
            }}
          >
            recommend
          </h1>
        </div>
      </div>

      <Box
        sx={{
          pt: 3,
          pb: screenshot ? 3 : 7,
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {recommendList.map((item) => (
              <Grid size={4} key={item._id}>
                <div className={`${styles.item} cyber-tile-small fg-dark`}>
                  <Image
                    src={getImageUrl(item.coverImage)}
                    width={90}
                    height={127}
                    loading="lazy"
                    alt={item.name}
                    style={{
                      aspectRatio: "1 / 1.414",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                  <label className={styles.itemLabel}>{item.name}</label>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <div
        className={classNames(
          styles.footer,
          screenshot && styles.footerScreenshot
        )}
      ></div>
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
