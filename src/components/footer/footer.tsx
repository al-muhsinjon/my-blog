import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      padding={"20px"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#141414",
        color: "white",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <Typography>
        © {format(new Date(), "yyyy")} Sammi. All rights reserved
      </Typography>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <TelegramIcon sx={{ cursor: "pointer" }} />
        <InstagramIcon sx={{ cursor: "pointer" }} />
        <YouTubeIcon sx={{ cursor: "pointer" }} />
      </Box>
    </Box>
  );
};

export default Footer;
