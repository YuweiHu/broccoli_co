"use client";
import { Container, Box, Typography, Button } from "@mui/material";

interface MainContentProps {
  onRequestInvite: () => void;
}

export default function MainContent({ onRequestInvite }: MainContentProps) {
  return (
    <Container
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "64px",
        mb: "64px",
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: "xl" }}>
        <Typography variant="h3" component="h2" gutterBottom>
          A better way to enjoy every day.
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Be the first to know when we launch.
        </Typography>
        <Button variant="contained" size="large" onClick={onRequestInvite}>
          Request an invite
        </Button>
      </Box>
    </Container>
  );
}
