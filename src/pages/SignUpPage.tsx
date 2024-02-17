import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Banner from "../assets/team.png";
import { Stylesheet } from "../styles/styles1";
import { Email, PersonSharp, Https, CallSharp } from "@mui/icons-material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { addUser } from "../features/slice";
import { useDispatch } from "react-redux";
import SimpleNav from "../components/SimpleNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Istate {
  formData: {
    email: string;
    password: string;
    username: string;
    contact: string;
  };
  isShow: boolean;
  error: boolean;
  errors: {
    email?: string;
    username?: string;
    contact?: string;
    password?: string;
  };
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Istate["formData"]>({
    email: "",
    password: "",
    username: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Istate["errors"]>({
    email: "",
    username: "",
    password: "",
    contact: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(() => {
      return { ...formData, [name]: value };
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isEmailValid = /^[a-z\d]+@[^@]+\.com$/.test(formData.email);
    const isUsernameValid = /^[a-z\d]{4,20}$/.test(formData.username);
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,}$/.test(
        formData.password
      );
    const isContactValid = /^\d{10}$/.test(formData.contact);
    const notify = () => toast("user signUp successfully done!");

    if (
      formData.email !== "" &&
      formData.username !== "" &&
      formData.contact !== "" &&
      formData.password !== "" &&
      isEmailValid &&
      isPasswordValid &&
      isContactValid &&
      isUsernameValid
    ) {
      setErrors({
        ...errors,
        email: "",
        username: "",
        password: "",
        contact: "",
      });
      notify();
      dispatch(addUser(formData));
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } else if (
      formData.email === "" &&
      formData.username === "" &&
      formData.contact === "" &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        username: "Please enter  username!",
        email: "cannot be empty!",
        contact: "cannot be empty!",
        password: "cannot be empty!",
      });
    } else if (
      isEmailValid &&
      formData.username === "" &&
      formData.contact === "" &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        username: "Please enter  username!",
        email: "",
        contact: "cannot be empty!",
        password: "cannot be empty!",
      });
    } else if (
      isEmailValid &&
      isUsernameValid &&
      formData.contact === "" &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        email: "",
        username: "",
        contact: "Please enter  mobile Number!",
        password: "cannot be empty!",
      });
    } else if (
      isEmailValid &&
      isUsernameValid &&
      isContactValid &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        email: "",
        username: "",
        contact: "",
        password: "cannot be empty!",
      });
    }

    if (formData.email !== "" && isEmailValid === false) {
      errors.email = "Enter Valid  Email Address";
    } else if (
      formData.username !== "" &&
      isEmailValid &&
      isUsernameValid === false
    ) {
      setErrors({
        ...errors,
        email: "",
        username: "Enter valid username with atleast 4 characters",
      });
    }

    if (
      formData.contact !== "" &&
      isEmailValid &&
      isUsernameValid &&
      isContactValid === false
    ) {
      errors.contact = "Enter valid contact number with [0-9]";
    }

    if (
      formData.password !== "" &&
      isEmailValid &&
      isUsernameValid &&
      isContactValid &&
      isPasswordValid === false
    ) {
      setErrors({
        ...errors,
        password:
          "Enter Valid Password With numbers, special characters and upper & lower case letters",
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <Typography sx={Stylesheet.leftContainer_headerContent1}>
              Sign Up to{" "}
            </Typography>
            <Typography sx={Stylesheet.leftContainer_headerContent2}>
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
                Email
              </InputLabel>
            </FormControl>
            <Input
              id="input-with-icon-adornment"
              type="text"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              name="email"
              value={formData.email}
              startAdornment={
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              }
            />
            {errors.email && (
              <Typography sx={Stylesheet.errorText}>{errors.email}</Typography>
            )}
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
              type="text"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Name"
              name="username"
              value={formData.username}
              startAdornment={
                <InputAdornment position="start">
                  <PersonSharp />
                </InputAdornment>
              }
            />
            {errors.username && (
              <Typography sx={Stylesheet.errorText}>
                {errors.password}
              </Typography>
            )}
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={Stylesheet.label}
              >
                Contact
              </InputLabel>
            </FormControl>
            <Input
              id="input-with-icon-adornment"
              type="number"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Mobile Number"
              name="contact"
              value={formData.contact}
              startAdornment={
                <InputAdornment position="start">
                  <CallSharp />
                </InputAdornment>
              }
            />
            {errors.contact && (
              <Typography sx={Stylesheet.errorText}>
                {errors.contact}
              </Typography>
            )}
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={Stylesheet.label}
              >
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
                  <Https />
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
            {errors.password && (
              <Typography sx={Stylesheet.errorText}>
                {errors.password}
              </Typography>
            )}
            <Button variant="contained" sx={Stylesheet.button} type="submit">
              {" "}
              Register{" "}
            </Button>
            <Box sx={Stylesheet.leftContainer_header2}>
              <Typography
                component={"p"}
                sx={Stylesheet.leftContainer_header2Content1}
              >
                Already have an Account ? Register{" "}
                <Box
                  component={"span"}
                  sx={Stylesheet.spanContent}
                  onClick={() => navigate("/signin")}
                >
                  Login here!
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

export default SignUpPage;
