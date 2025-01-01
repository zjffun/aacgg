import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import localFont from "next/font/local";
// import PostCard from '../components/PostCard';
import "./cyberpunk.css";
import styles from "./page.module.css";

// Initialize the local font
const cyberpunkFont = localFont({
  src: "../fonts/Cyberpunk.ttf",
  variable: "--font-cyberpunk",
});

export default function RecommendPage() {
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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid size={4} key={item}>
                <div className="cyber-tile-small fg-dark bg-cyan">
                  <div
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  ></div>
                  {/* <img src="image.jpg"> */}
                  <label>Text content</label>
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
