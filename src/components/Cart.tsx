import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/Store";
import { Styles } from "../styles/HomePage";
import cCart from "../assets/cart.webp";

import { useNavigate } from "react-router-dom";
import { findAddrs, removeFromCart } from "../features/slice";
import NavBar from "./NavBar";
import Payment from "./Payment";

interface Istate {
  checked: boolean;
  toggle: boolean;
  show: string;
  code: string;
  check: boolean;
  open: boolean;
  address: string;
  location: {
    Region: string | undefined;
    State: string | undefined;
  };
}

const style = {
  position: "absolute" as "absolute",
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
  const { cart, postOffice, msg } = useSelector(
    (state: RootState) => state.Ecommerce
  );

  const [location, setLocation] = useState<Istate["location"]>();
  const [toggle, setToggle] = useState<Istate["toggle"]>(false);
  const [checked, setChecked] = useState<Istate["checked"]>(false);
  const [display, setDisplay] = useState<Istate["show"]>("flex");
  const [code, setCode] = useState<Istate["code"]>("");
  const [check, setCheck] = useState<Istate["check"]>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState<Istate["open"]>(false);
  const [adrs, setAdrs] = useState<Istate["address"]>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let data = postOffice?.find((obj) => obj.Name === adrs);
    data &&
      setLocation({ ...location, Region: data.Region, State: data.State });
  }, [adrs, location, postOffice]);

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

  const handleToggle = () => {
    let token = localStorage.getItem("UserData");
    if (token) {
      setToggle(!toggle);
      setDisplay("none");
    } else {
      navigate("/signin");
    }
  };

  const RemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
    setCode("");
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
        console.log("set timeout called");
        callback(args);
      }, delay);
    };
  };
  const handleInput = (inputValue: string) => {
    dispatch(findAddrs(inputValue));
  };
  const debounceHandler = debouncedSearch(handleInput, 2000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value || transcript);

    dispatch(findAddrs(event.target.value || transcript));
  };

  const handleAdd = () => {
    handleOpen();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAdrs(event.target.value);
  };

  const addHandler = () => {
    handleClose();
  };

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
          <Box component={"form"} sx={Styles.formContainer}>
            <TextField
              onChange={handleChange}
              name="txt"
              value={code}
              helperText={code && msg}
              placeholder="Enter Pincode"
            />

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              onChange={handleSelectChange}
              name="Name"
            >
              <MenuItem>Select Area Name</MenuItem>
              {postOffice?.map((adrs, ind) => (
                <MenuItem key={ind} value={adrs.Name}>
                  {adrs?.Name}
                </MenuItem>
              ))}
            </Select>
            <TextField value={location?.Region} />
            <TextField value={location?.State} />

            <Button variant="contained" onClick={addHandler}>
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

                  {check ? (
                    <Box sx={Styles.addrInnerText}>
                      <TextField />
                      <Box>
                        <Typography>
                          Microphone: {listening ? "on" : "off"}
                        </Typography>

                        <Button onClick={startListening}>Start</Button>
                        <Button onClick={SpeechRecognition.stopListening}>
                          Stop
                        </Button>
                        <Typography color={"red"}>{transcript}</Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Box>
                        {" "}
                        <Button onClick={handleAdd}>Add New Addres</Button>
                      </Box>
                      {location?.State !== undefined && (
                        <Box sx={Styles.addrInnerText}>
                          {" "}
                          <Box
                            component={"input"}
                            type="radio"
                            checked={checked}
                            onClick={() => setChecked(!checked)}
                          />
                          <Box>
                            {adrs +
                              "  " +
                              location?.State +
                              "  " +
                              location?.Region}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}

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
