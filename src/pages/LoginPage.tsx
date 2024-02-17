import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Input,
} from "@mui/material";
import Banner from "../assets/team.png";
import { Stylesheet } from "../styles/styles1";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/Store";
import SimpleNav from "../components/SimpleNav";

interface Istate {
  formData: {
    email: string;
    password: string;
  };
  isShow: boolean;
  error: boolean;
  erMsg: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state: RootState) => state.Ecommerce);
  const [formData, setFormData] = useState<Istate["formData"]>({
    email: "",
    password: "",
  });

  const [erMsg, setErMsg] = useState<Istate["erMsg"]>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(() => {
      return { ...formData, [name]: value };
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const notify = () => toast("user Login successfully done!");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const getUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (formData.email === "" || formData.password === "") {
      setErMsg("input fields cannot be empty!");
    } else {
      if (getUser) {
        setErMsg("");
        localStorage.setItem("UserData", JSON.stringify(getUser));
        notify();
        setTimeout(() => navigate(-1), 2000);
      } else {
        setErMsg("please enter correct credentials!");
      }
    }
  };

  return (
    <>
      <SimpleNav />
      <ToastContainer />
      <Box sx={Stylesheet.loginPage}>
        <Box sx={Stylesheet.rightContainer}>
          <Box sx={Stylesheet.leftContainer_header1}>
            <Typography sx={Stylesheet.leftContainer_header1_Con}>
              Welcome !
            </Typography>
            <Typography
              variant="h2"
              sx={Stylesheet.leftContainer_headerContent1}
            >
              Sign in to{" "}
            </Typography>
            <Typography
              variant="h3"
              sx={Stylesheet.leftContainer_headerContent2}
            >
              Lorem Ipsum is simply{" "}
            </Typography>
          </Box>

          <Box
            component={"form"}
            sx={Stylesheet.formContainer}
            onSubmit={handleSubmit}
          >
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={Stylesheet.label}
              >
                User name
              </InputLabel>
            </FormControl>

            <Input
              id="input-with-icon-adornment"
              type="email"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              name="email"
              value={formData.email}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                Password
              </InputLabel>
            </FormControl>

            <Input
              id="input-with-icon-adornment"
              type={showPassword ? "text" : "password"}
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your password"
              name="password"
              value={formData.password}
              startAdornment={
                <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            {erMsg && (
              <Typography color={"red"} fontSize={12}>
                {erMsg}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={Stylesheet.button}
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Box sx={Stylesheet.leftContainer_header2}>
              <Typography
                component={"p"}
                sx={Stylesheet.leftContainer_header2Content1}
              >
                Don't have an Account ?
                <Box
                  component={"span"}
                  sx={Stylesheet.spanContent}
                  onClick={() => navigate("/signup")}
                >
                  Register here!
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={Stylesheet.leftContainer}>
          <Box
            component={"img"}
            src={Banner}
            alt="no-img"
            sx={Stylesheet.personImg}
          />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
