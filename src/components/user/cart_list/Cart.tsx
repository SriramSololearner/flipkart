import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { Styles } from "./styles";
import cCart from "../../../assets/cart/cart.webp";

import { useLocation, useNavigate } from "react-router-dom";
import {
  addAddres,
  findAddrs,
  removeFromCart,
} from "../../../redux/reducer/slice";
import NavBar from "../../navbar/NavBar";
import Payment from "../../payment_gateway/Payment";

interface Istate {
  checked: boolean;
  checkedValue: number;
  toggle: boolean;
  show: string;
  pinCode: string;
  check: boolean;
  open: boolean;
  address: string;
  location: {
    district: string | undefined;
    State: string | undefined;
  };
  adres: {
    username: string;
    mobile: string;
    pincode: string;
    area: string;
    adrs: string;
    city: string;
    state: string;
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "50%", md: "40%", lg: "30%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const Location = useLocation();
  const { cart, postOffice, msg, adress } = useSelector(
    (state: RootState) => state.Ecommerce
  );
  const [location, setLocation] = useState<Istate["location"]>({
    district: "",
    State: "",
  });
  const [checkedValue, setCheckedValue] = useState<Istate["checkedValue"]>();
  const [checked, setChecked] = useState<Istate["checked"]>(false);
  const [toggle, setToggle] = useState<Istate["toggle"]>(false);
  const [display, setDisplay] = useState<Istate["show"]>("flex");
  const [pincode, setPincode] = useState<Istate["pinCode"]>("");

  //eslint-disable-next-line
  const [check, setCheck] = useState<Istate["check"]>(false);
  const [open, setOpen] = useState<Istate["open"]>(false);
  const [adrs, setAdrs] = useState<Istate["address"]>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [adresForm, setAdresForm] = useState<Istate["adres"]>({
    username: "",
    mobile: "",
    pincode: "",
    area: "",
    adrs: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    let data = postOffice && postOffice[0];
    data &&
      setLocation({
        ...location,
        district: data?.District,
        State: data?.State,
      });
  }, [postOffice, adrs, pincode]);

  const handleToggle = () => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setToggle(!toggle);
      setDisplay("none");
    } else {
      navigate("/signin", { state: Location.pathname });
    }
  };

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdresForm({ ...adresForm, [event.target.name]: event.target.value });
  };

  const RemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  let total: any = cart.reduce((acc, val) => {
    return acc + val.price * val.qty;
  }, 0);

  let Discount: number = (total / 100) * 25;
  let DeliveryCharges: number = (total / 100) * 10;
  let Total = Math.round(total - Discount);

  const debouncedSearch = (callback: any, delay: number) => {
    let timer: NodeJS.Timeout;
    return (args: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(args);
      }, delay);
    };
  };
  const handleInput = (inputValue: string) => {
    dispatch(findAddrs(inputValue));
  };
  const picodeApiHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPincode(event.target.value);
    dispatch(findAddrs(event.target.value));
  };

  //eslint-disable-next-line
  const debounceHandler = debouncedSearch(handleInput, 2000);

  const handleAdd = () => {
    handleOpen();
  };

  const handlerChecked = (value: number) => {
    setChecked(!checked);
    setCheckedValue(value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAdrs(event.target.value);
  };
  const handlerAutoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation({ ...location, [event.target.name]: event.target.value });
  };
  const addHandler = () => {
    dispatch(addAddres(adresForm));
    handleClose();
  };

  const {
    transcript,
    listening,

    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <NavBar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component={"form"}
            sx={Styles.formContainer}
            onSubmit={addHandler}
          >
            <Box sx={Styles.formInnerContainer}>
              <TextField
                required
                placeholder="enter name"
                name="username"
                value={adresForm.username}
                onChange={handlerChange}
              />
              <TextField
                placeholder="enter mobile No"
                name="mobile"
                required
                value={adresForm.mobile}
                onChange={handlerChange}
              />
            </Box>
            <Box sx={Styles.formInnerContainer}>
              <TextField
                value={pincode}
                helperText={pincode && msg}
                placeholder="Enter Pincode"
                onChange={picodeApiHandler}
              />

              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                onChange={handleSelectChange}
                name="Name"
                value={adrs}
                sx={Styles.adresField}
              >
                <MenuItem defaultValue={"select"}>
                  <em>Select Area Name</em>
                </MenuItem>
                {postOffice?.map((adrs, ind) => (
                  <MenuItem key={ind} value={adrs.Name}>
                    {adrs?.Name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <TextField
              required
              placeholder="Locality"
              name="area"
              value={adresForm.area}
              onChange={handlerChange}
            />
            <Box sx={Styles.formInnerContainer}>
              <TextField
                required
                placeholder="enter City/District"
                name="district"
                value={location.district}
                onChange={handlerAutoChange}
              />
              <TextField
                placeholder="enter state"
                name="state"
                value={location.State}
                onChange={handlerAutoChange}
              />
            </Box>
            <Box>
              <Typography>Microphone: {listening ? "on" : "off"}</Typography>

              <Button onClick={startListening}>Start</Button>
              <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
              <Typography color={"red"}>{transcript}</Typography>
            </Box>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box sx={Styles.CartContainer}>
        {cart.length === 0 ? (
          <Box sx={Styles.CartEmpty}>
            <Box component={"img"} src={cCart} sx={Styles.CartImg} alt="cart" />
            <Box>Missing Cart items?</Box>
            <Box sx={Styles.LogTxt}>Please Add New Items</Box>
            <Box
              component={"button"}
              sx={Styles.logBtn}
              onClick={() => navigate("/")}
            >
              Back
            </Box>
          </Box>
        ) : (
          <Box sx={Styles.cartListContainer}>
            {!toggle ? (
              <Box sx={Styles.cartListInnerContainer}>
                {cart.map((product) => (
                  <Box sx={Styles.cartList} key={product.id}>
                    <Box
                      component={"img"}
                      src={product.image}
                      alt="Product"
                      sx={Styles.cartThumnail}
                    />
                    <Box>
                      <Box sx={Styles.cartPrice}>
                        <Box>
                          {" "}
                          Quantity:
                          {cart.find((obj) => obj.id === product.id)?.qty}
                        </Box>
                      </Box>
                      <Box fontWeight={900} mt={"10px"}>
                        Price ₹{product.price * product.qty}
                      </Box>
                      <Button
                        variant="text"
                        sx={Styles.remove}
                        onClick={() => RemoveProduct(product.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={Styles.addrContainer}>
                <Box sx={Styles.address}>
                  <Typography sx={Styles.deliveryTag}>
                    DELIVERY ADDRESS
                  </Typography>
                  <Box sx={Styles.addrChild1}>
                    <Box>Sriram </Box>
                    {check ? <Button>Save</Button> : <Button>EDIT</Button>}
                  </Box>

                  <Stack>
                    <Box>
                      {" "}
                      <Button
                        variant="outlined"
                        onClick={handleAdd}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        Add New Addres
                      </Button>
                    </Box>

                    <Box sx={Styles.addrInnerText}>
                      {adress.map((item) => (
                        <Stack direction={"row"} gap={1} sx={Styles.eachAdres}>
                          <Box
                            component={"input"}
                            type="radio"
                            checked={checkedValue === item.id && checked}
                            onClick={() => handlerChecked(item.id)}
                          />
                          <Box>
                            {item.username +
                              " " +
                              item.mobile +
                              " " +
                              item.area}
                          </Box>
                        </Stack>
                      ))}
                    </Box>
                  </Stack>

                  <Button disabled={!checked} variant="contained">
                    <Payment />
                  </Button>
                </Box>
              </Box>
            )}
            {cart.length !== 0 && (
              <Container sx={Styles.checkoutPageContainer}>
                <Box sx={Styles.innerContainer}>
                  <Box sx={Styles.innerHeader}>PRICE DETAILS</Box>
                  <Divider component={"header"} />
                  <Box sx={Styles.ChecoutItems}>
                    <Box>Price({cart.length} items)</Box> ₹{total.toFixed(2)}
                  </Box>
                  <Box sx={Styles.ChecoutItems}>
                    {" "}
                    <Box>Discount </Box>{" "}
                    <Box color={"green"}> - ₹{Discount.toFixed(0)} </Box>
                  </Box>
                  <Box sx={Styles.ChecoutItems}>
                    {" "}
                    <Box>Delivery Charges</Box>
                    <Box sx={Styles.deliveryChr}>
                      <Typography
                        sx={Styles.charg}
                      >{`₹${DeliveryCharges.toFixed(0)}`}</Typography>
                      <Box sx={Styles.free}>Free</Box>
                    </Box>
                  </Box>
                  <Divider component={"hr"} />
                  <Box sx={Styles.ChecoutItemsTotal}>
                    {" "}
                    <Box> Total Amount</Box> <Box> ₹{Total.toFixed(0)}</Box>
                  </Box>
                  <Divider component={"hr"} />
                  <Box color={"green"} sx={Styles.text}>
                    You will save ₹{Discount.toFixed(0)} on this order
                  </Box>
                  <Button
                    variant="outlined"
                    sx={{ ...Styles.button, display: `${display}` }}
                    onClick={handleToggle}
                  >
                    Checkout
                  </Button>
                </Box>
              </Container>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Cart;
