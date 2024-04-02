import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AdjustIcon from "@mui/icons-material/Adjust";
import { navItems } from "@/src/config/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  window?: () => Window;
}

const Navbar = ({ window }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const router = useRouter();

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: "20px",
        }}
      >
        <Box sx={{ my: 2, display: "flex", alignItems: "center", gap: "5px" }}>
          <Image width={50} height={50} alt="" src={"/favicon.svg"} />
          <Typography variant="h4" component={"div"} fontFamily={"fantasy"}>
            Sammi
          </Typography>
        </Box>
        <CloseIcon onClick={handleDrawerToggle} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.route} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.route)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ background: "#141414" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            <Image width={50} height={50} alt="" src={"/favicon.svg"} />
            <Typography variant="h4" component={"div"} fontFamily={"fantasy"}>
              Sammi
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => router.push(item.route)}
                key={item.label}
                sx={{ color: "#fff" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
