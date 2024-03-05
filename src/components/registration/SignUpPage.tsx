import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Banner from "../../assets/registration/team.png";
import { Stylesheet } from "../../styles/styles1";
import { Email, PersonSharp, Https, CallSharp } from "@mui/icons-material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/reducer/slice";
import { useDispatch } from "react-redux";
import SimpleNav from "./SimpleNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupUrl } from "../../utilities/constants";

interface Istate {
  formData: {
    email: string;
    password: string;
    name: string;
    mobile: string;
  };
  isShow: boolean;
  error: boolean;
  errors: {
    email?: string;
    name?: string;
    mobile?: string;
    password?: string;
  };
  role: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("SelectType");
  const [formData, setFormData] = useState<Istate["formData"]>({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<Istate["errors"]>({
    email: "",
    name: "",
    password: "",
    mobile: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(() => {
      return { ...formData, [name]: value };
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlerRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const isEmailValid = /^[a-z\d]+@[^@]+\.com$/.test(formData.email);
    const isUsernameValid = /^[a-z\d]{4,20}$/.test(formData.name);
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,}$/.test(
        formData.password
      );
    const isContactValid = /^\d{10}$/.test(formData.mobile);

    if (
      formData.email !== "" &&
      formData.name !== "" &&
      formData.mobile !== "" &&
      formData.password !== "" &&
      isEmailValid &&
      isPasswordValid &&
      isContactValid &&
      isUsernameValid
    ) {
      setErrors({
        ...errors,
        email: "",
        name: "",
        password: "",
        mobile: "",
      });
      const form = new FormData();
      form.append("roleId", role);
      form.append("name", formData.name);
      form.append("mobile", formData.mobile);
      form.append("email", formData.email);
      form.append("password", formData.password);

      const response = await axios.post(signupUrl + role, form);
      try {
        response.data.status && toast.success(response.data.message);
        setTimeout(() => {
          navigate("/signin");
        }, 3000);

        !response.data.status && toast.error(response.data.message);
      } catch {
        toast.error(response.data.message);
      }

      // dispatch(addUser(formData));
    } else if (
      formData.email === "" &&
      formData.name === "" &&
      formData.mobile === "" &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        name: "Please enter  name!",
        email: "cannot be empty!",
        mobile: "cannot be empty!",
        password: "cannot be empty!",
      });
    } else if (
      isEmailValid &&
      formData.name === "" &&
      formData.mobile === "" &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        name: "Please enter  name!",
        email: "",
        mobile: "cannot be empty!",
        password: "cannot be empty!",
      });
    } else if (
      isEmailValid &&
      isUsernameValid &&
      formData.mobile === "" &&
      formData.password === ""
    ) {
      setErrors({
        ...errors,
        email: "",
        name: "",
        mobile: "Please enter  mobile Number!",
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
        name: "",
        mobile: "",
        password: "cannot be empty!",
      });
    }

    if (formData.email !== "" && isEmailValid === false) {
      errors.email = "Enter Valid  Email Address";
    } else if (
      formData.name !== "" &&
      isEmailValid &&
      isUsernameValid === false
    ) {
      setErrors({
        ...errors,
        email: "",
        name: "Enter valid name with atleast 4 characters",
      });
    }

    if (
      formData.mobile !== "" &&
      isEmailValid &&
      isUsernameValid &&
      isContactValid === false
    ) {
      errors.mobile = "Enter valid mobile number with [0-9]";
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
            <TextField
              variant="standard"
              id="input-with-icon-adornment"
              type="text"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              name="email"
              value={formData.email}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
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
            <TextField
              variant="standard"
              id="input-with-icon-adornment"
              type="text"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Name"
              name="name"
              value={formData.name}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSharp />
                  </InputAdornment>
                ),
              }}
            />
            {errors.name && (
              <Typography sx={Stylesheet.errorText}>
                {errors.password}
              </Typography>
            )}

            <FormControl variant="standard" sx={Stylesheet.roleInput}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={role}
                onChange={handlerRoleChange}
              >
                <MenuItem value="SelectType">
                  <em>select Type</em>
                </MenuItem>
                <MenuItem value={0}>user</MenuItem>
                <MenuItem value={2}>seller</MenuItem>
                <MenuItem value={3}>admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={Stylesheet.label}
              >
                mobile
              </InputLabel>
            </FormControl>
            <TextField
              variant="standard"
              id="input-with-icon-adornment"
              type="number"
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your Mobile Number"
              name="mobile"
              value={formData.mobile}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <CallSharp />
                  </InputAdornment>
                ),
              }}
            />
            {errors.mobile && (
              <Typography sx={Stylesheet.errorText}>{errors.mobile}</Typography>
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
            <TextField
              variant="standard"
              id="input-with-icon-adornment"
              type={showPassword ? "text" : "password"}
              sx={Stylesheet.input1}
              onChange={handleChange}
              placeholder="Enter Your password"
              name="password"
              value={formData.password}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Https />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
