import * as React from "react";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

export default function Page() {
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Masonry columns={2} spacing={2}>
        {heights.map((height, index) => (
          <Paper key={index} sx={{ height }}>
            {index + 1}
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}
