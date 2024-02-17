import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Styles } from "../styles/HomePage";
import { useNavigate } from "react-router-dom";

function SimpleNav() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <Box sx={Styles.logo}>
              {" "}
              Ecommerce{" "}
              <Box component={"span"} sx={Styles.Span}>
                Toolkit
              </Box>
            </Box>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SimpleNav;
