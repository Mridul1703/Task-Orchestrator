"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function Navbar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavTicket = () => {
    setAnchorElNav(null);
    router.push("/raise-ticket");
  };

  const handleCloseNavBoard = () => {
    setAnchorElNav(null);
    router.push("/board");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "black",
          height: "70px",
          borderBottom: "2px solid grey",
        }}
      >
        <Toolbar>
          <Typography
            onClick={() => {
              router.push("/");
            }}
            variant="h6"
            component="div"
            sx={{ color: "#45CE4A", fontWeight: "bold", cursor: "pointer" }}
          >
            Task Orchestrator
          </Typography>
          {!matches && (
            <Box
              sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
            >
              <Button
                onClick={() => {
                  router.push("/raise-ticket");
                }}
                color="inherit"
                sx={{
                  bgcolor: "#008000",
                  marginRight: 1,
                  borderRadius: "10px",
                  p: 1.5,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.09)",
                    bgcolor: "#026b02",
                  },
                }}
              >
                Raise a Ticket
              </Button>
              <Button
                onClick={() => {
                  router.push("/board");
                }}
                color="inherit"
                sx={{
                  bgcolor: "#008000",
                  marginRight: 1,
                  borderRadius: "10px",
                  p: 1.5,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.09)",
                    bgcolor: "#026b02",
                  },
                }}
              >
                Plan a Project
              </Button>
            </Box>
          )}
          {matches && (
            <Box
              sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavTicket}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem
              onClick={handleCloseNavTicket}
              sx={{ height: "60px", "&:hover": { color: "#432855" } }}
            >
              Raise a Ticket
            </MenuItem>
            <MenuItem
              onClick={handleCloseNavBoard}
              sx={{ height: "60px", "&:hover": { color: "#432855" } }}
            >
              Plan a Project
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
