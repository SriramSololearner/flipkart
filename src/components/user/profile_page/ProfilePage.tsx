import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import NavBar from "../../navbar/NavBar";
import { Styles } from "./ProfileStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { ChangeEvent, useState } from "react";
import { updateUser } from "../../../redux/reducer/slice";
import SideBar from "../../common/sidebar.tsx/SideBar";

interface Istate {
  toggle: boolean;
  formData: {
    id: number;
    username: string;
    email: string;
    contact: string;
  };
}
const userData = JSON.parse(localStorage.getItem("UserData") ?? "{}");
const ProfilePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.Ecommerce);
  const dispatch = useDispatch<AppDispatch>();
  const [toggle, setToggle] = useState<Istate["toggle"]>(false);

  const [formData, setFormData] = useState<Istate["formData"]>({
    id: userData?.id,
    email: currentUser.email,
    username: currentUser.username,
    contact: currentUser.contact,
  });

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    console.log(formData);
    dispatch(updateUser(formData));
    setToggle(!toggle);
    setFormData({ ...formData, id: 0, email: "", username: "", contact: "" });
  };

  return (
    <Box sx={Styles.root}>
      <NavBar />
      <Container>
        <Grid container mt={10} spacing={2}>
          <Grid item xs={12} md={3.6}>
            <SideBar />
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

                <Stack direction={"row"} alignItems={"center"}>
                  <Typography> Email Address</Typography>
                </Stack>
                <TextField
                  disabled={!toggle}
                  id="outlined-disabled"
                  defaultValue={formData.email}
                  name="email"
                  onChange={handleChange}
                />

                {toggle && (
                  <Button onClick={handleUpdate} variant="contained">
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
