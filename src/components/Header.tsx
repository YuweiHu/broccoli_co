"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="h1">
          Broccoli & Co.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
