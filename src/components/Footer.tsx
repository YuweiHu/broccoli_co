"use client";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Made with ❤️ in Melbourne.
      </Typography>
    </Box>
  );
}
