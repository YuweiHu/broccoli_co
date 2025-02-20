"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import InviteModal from "../components/InviteModal";
import ClientOnly from "../components/ClientOnly";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <MainContent onRequestInvite={() => setIsModalOpen(true)} />
      <Footer />
      <ClientOnly>
        <InviteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </ClientOnly>
    </Box>
  );
}
