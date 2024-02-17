import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Stack,
  Menu,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/Store";
import { useEffect, useState } from "react";
import { fetchData } from "../features/slice";
import { Styles } from "../styles/HomePage";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const settings = ["Profile", "Home", "Logout"];

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.Ecommerce);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData);
  }, [dispatch]);

  const handlerLogin = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlerMenuItem = (item: string) => {
    switch (item) {
      case "Logout":
        handlerLogin();
        break;
      case "Profile":
        navigate("/Profile");
        break;
      case "Home":
        navigate("/");
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

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
                  {settings.map((setting) => (
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
