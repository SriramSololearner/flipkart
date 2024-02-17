import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import NavBar from "../components/NavBar";
import { Styles } from "../styles/ProfileStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/Store";
import orders from "../assets/orders.png";
import log from "../assets/logout.png";
import settings from "../assets/settings.png";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../features/slice";

interface Istate {
  toggle: boolean;
  formData: {
    id: number;
    username: string;
    email: string;
    contact: string;
  };
}
const userData = JSON.parse(localStorage.getItem("UserData") || "{}");
const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users } = useSelector((state: RootState) => state.Ecommerce);
  const [toggle, setToggle] = useState<Istate["toggle"]>(false);
  const [formData, setFormData] = useState<Istate["formData"]>({
    id: userData?.id,
    email: userData.email,
    username: userData.username,
    contact: userData.contact,
  });

  useEffect(() => {
    //update formData state
    console.log(userData);
    console.log(users);
    if (userData) setFormData(userData);
  }, [formData]);

  const handlerLogin = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (userId: number) => {
    console.log(formData);
    dispatch(updateUser({ userId, formData }));
    setToggle(!toggle);
    setFormData({ ...formData, id: 0, email: "", username: "", contact: "" });
  };
  console.log(formData.id);

  return (
    <Box sx={Styles.root}>
      <NavBar />
      <Container>
        <Grid container mt={10} spacing={2}>
          <Grid item xs={12} md={3.6}>
            <Stack
              direction={"row"}
              gap={2}
              alignItems="center"
              sx={Styles.sideBar.container}
            >
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Stack direction={"column"} alignItems={"flex-start"}>
                <Typography>Hello</Typography>
                <Typography>
                  {users.find((obj) => obj.id === userData.id)?.username}
                </Typography>
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
                    <ListItem disablePadding onClick={handlerLogin}>
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
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack
              direction={"row"}
              gap={2}
              alignItems="center"
              sx={Styles.sideBar.container}
            >
              <Stack direction={"column"} alignItems={"flex-start"} gap={2}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography>Personal Information</Typography>{" "}
                  {toggle ? (
                    <Button onClick={handleEdit}>Cancel</Button>
                  ) : (
                    <Button onClick={handleEdit}>Edit</Button>
                  )}
                </Stack>
                <Stack direction={"row"} gap={1}>
                  <TextField
                    disabled={!toggle}
                    id="outlined-disabled"
                    defaultValue={formData.username}
                    name="username"
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction={"row"} alignItems={"center"}>
                  <Typography> Mobile Number</Typography>
                </Stack>
                <TextField
                  disabled={!toggle}
                  id="outlined-disabled"
                  defaultValue={formData.contact}
                  name="contact"
                  onChange={handleChange}
                />

                {toggle && (
                  <Button
                    onClick={() => handleUpdate(userData.id)}
                    variant="contained"
                  >
                    Save
                  </Button>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
