import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Stack,
  Menu,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useEffect, useState } from "react";
import { Styles } from "../../styles/HomePage";
import { ShoppingCart } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const userData = localStorage.getItem("UserData");

export default function NavBar() {
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { cart, profileUrl } = useSelector(
    (state: RootState) => state.Ecommerce
  );
  const navigate = useNavigate();
  const [settings, setSettings] = useState<string[]>([
    "Myprofile",
    "Home",
    "WishList",
    "Login",
  ]);

  useEffect(() => {
    setSettings((prev) =>
      userData !== null ? ["Myprofile", "Home", "WishList", "Logout"] : prev
    );
  }, []);

  const handlerLogout = () => {
    localStorage.removeItem("UserData");
    setSettings((prev) =>
      userData === null ? ["Myprofile", "Home", "WishList", "Login"] : prev
    );
    navigate("/");
  };

  const handlerLogin = () => {
    navigate("/signin", { state: location.pathname });
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlerMenuItem = (item: string | undefined) => {
    switch (item) {
      case "Logout":
        handlerLogout();
        break;
      case "Login":
        handlerLogin();
        break;
      case "Myprofile":
        navigate("/Profile");
        break;
      case "Home":
        navigate("/");
        break;
      case "WishList":
        navigate("/wishList");
        break;
      default:
        return;
    }
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <IconButton
              onClick={() => navigate("/")}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Box sx={Styles.logo}>
                {" "}
                Ecommerce{" "}
                <Box component={"span"} sx={Styles.logoSpan}>
                  Toolkit
                </Box>
              </Box>
            </IconButton>

            <Stack direction={"row"} alignItems={"center"} gap={3}>
              <Stack onClick={() => navigate("/cart")}>
                <Box sx={Styles.cartNum}>{cart.length > 0 && cart.length}</Box>
                <ShoppingCart sx={Styles.cartIcon1} />
              </Stack>

              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt="Remy Sharp" src={profileUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, ind) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handlerMenuItem(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
