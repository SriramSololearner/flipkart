import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { Styles } from "../../../styles/ProfileStyle";
import { useDispatch, useSelector } from "react-redux";

import orders from "../../../assets/profile/orders.png";
import log from "../../../assets/profile/logout.png";
import settings from "../../../assets/profile/settings.png";
import { RootState } from "../../../redux/Store";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { uploadImage } from "../../../redux/reducer/slice";

const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { profileUrl, currentUser } = useSelector(
    (state: RootState) => state.Ecommerce
  );
  const navigate = useNavigate();
  const handlerLogout = () => {
    localStorage.clear();
    navigate("/signin", { state: location.pathname });
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const url: File = (event.target.files as FileList)[0];
    dispatch(url && uploadImage(URL.createObjectURL(url)));
  };

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        alignItems="center"
        sx={Styles.sideBar.container}
      >
        <IconButton>
          <Box component={"label"} htmlFor="image">
            <Avatar alt="Remy Sharp" src={profileUrl} />
          </Box>
          <Box
            component={"input"}
            onChange={handleUpload}
            type="file"
            id="image"
            sx={Styles.sideBar.uploadBtn}
          ></Box>
        </IconButton>
        <Stack direction={"column"} alignItems={"flex-start"}>
          <Typography>Hello</Typography>
          <Typography>{currentUser.username}</Typography>
        </Stack>
      </Stack>
      <Stack sx={Styles.sideBar.container}>
        <Stack direction={"column"}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Box
                      component={"img"}
                      src={orders}
                      sx={Styles.sideBar.orderrIcon}
                    />
                  </ListItemIcon>
                  <ListItemText primary="My orders" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Box
                      component={"img"}
                      src={settings}
                      sx={Styles.sideBar.orderrIcon}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding onClick={handlerLogout}>
                <ListItemButton>
                  <ListItemIcon>
                    <Box
                      component={"img"}
                      src={log}
                      sx={Styles.sideBar.orderrIcon}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Stack>
      </Stack>
    </>
  );
};

export default SideBar;
