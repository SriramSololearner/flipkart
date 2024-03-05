import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyleSheet } from "./CardStyles";
import assured from "../../../assets/single_product/fa_62673a.png";
import NavBar from "../../navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import {
  addCart,
  addWishlist,
  removeFromWishList,
} from "../../../redux/reducer/slice";
import { Styles } from "../../../styles/HomePage";

interface Istate {
  product: {
    id: number;
    brand: string;
    category: string;
    description: string;
    price: number;
    rating: {
      count: number;
      rate: number;
    };
    thumbnail: "";
    image: string;
    url: string[];
    title: string;
  };
  hovindex: number;
}

const userData = localStorage.getItem("token");

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Istate["product"]>();
  const { cart, isAdded, wishList, addWishList } = useSelector(
    (state: RootState) => state.Ecommerce
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleAddCart = (
    product:
      | {
          id: number;
          brand: string;
          category: string;
          description: string;
          price: number;
          rating: {
            count: number;
            rate: number;
          };
          thumbnail: "";
        }
      | undefined
  ) => {
    dispatch(addCart({ ...product, qty: 1 }));
  };

  const handleWishList = (
    product:
      | {
          id: number;
          title: string;
          description: string;
          category: string;
          price: number;
          rating: {
            rate: number;
            count: number;
          };
          image: string;
        }
      | undefined
  ) => {
    dispatch(addWishlist(product));
  };

  const handleRemoveWishList = (id: number | undefined) => {
    dispatch(removeFromWishList(id));
  };

  const handleNaviagte = () => {
    userData ? navigate("/cart") : navigate("/signin");
  };

  return (
    <Box sx={StyleSheet.rootContainer}>
      <NavBar />
      <Container maxWidth="xl" sx={StyleSheet.Container}>
        <Box sx={StyleSheet.Main}>
          {
            <Box sx={StyleSheet.product}>
              <Box sx={StyleSheet.prodContainer}>
                <Box
                  component="img"
                  src={product?.image}
                  sx={StyleSheet.prodImage}
                />
                {wishList.find((obj) => obj.id === product?.id) &&
                addWishList ? (
                  <FavoriteIcon
                    sx={Styles.favIcons}
                    onClick={() => handleRemoveWishList(product?.id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={Styles.favBorderIcon}
                    onClick={() => handleWishList(product)}
                  />
                )}

                <Box sx={StyleSheet.btnGrp}>
                  {cart.find((obj) => obj.id === product?.id) && isAdded ? (
                    <Button
                      variant="outlined"
                      startIcon={<ShoppingCartIcon />}
                      sx={StyleSheet.Cart}
                      onClick={() => navigate("/cart")}
                    >
                      Go To Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<ShoppingCartIcon />}
                      sx={StyleSheet.Cart}
                      onClick={() => handleAddCart(product)}
                    >
                      ADD TO CART
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    startIcon={<FlashOnIcon />}
                    sx={StyleSheet.Buy}
                    onClick={handleNaviagte}
                  >
                    BUY NOW
                  </Button>
                </Box>
              </Box>

              {/* ProdDetails */}

              <Box sx={StyleSheet.prodDetails}>
                <Typography sx={StyleSheet.prodDesc}>
                  {product?.description}
                </Typography>

                <Box sx={StyleSheet.Rating}>
                  <Typography sx={StyleSheet.RatingInnerCont}>
                    {product && Math.floor(product.rating.rate)}.0 ★{" "}
                  </Typography>
                  <Typography component="p" sx={StyleSheet.Review}>
                    1,343 Ratings & 43 Reviews
                  </Typography>{" "}
                  <Box
                    component="img"
                    src={assured}
                    sx={StyleSheet.assured}
                  ></Box>
                </Box>

                <Typography sx={StyleSheet.PriceTxt}>
                  {" "}
                  Special price{" "}
                </Typography>
                <Box sx={StyleSheet.priceTag}>
                  <Typography sx={StyleSheet.price}>
                    {" "}
                    ₹{product?.price}
                  </Typography>
                  <Typography sx={StyleSheet.Oldprice}> ₹4,618</Typography>
                  <Typography sx={StyleSheet.offer}> 81% off</Typography>
                </Box>
                <Typography sx={StyleSheet.offerTag}>
                  Available offers
                </Typography>

                {/* offer1 */}

                <Box sx={StyleSheet.BankOffer}>
                  <Typography sx={StyleSheet.Tag}>
                    {" "}
                    <LocalOfferIcon />
                  </Typography>
                  <Typography sx={StyleSheet.offerTxt}>Bank Offer</Typography>
                  <Typography sx={StyleSheet.cardOffer}>
                    10% off on Axis Bank Credit Card EMI Transactions, up to
                    ₹1,500 on orders of ₹5,000 and above
                  </Typography>
                  <Typography sx={StyleSheet.Tc}> T&C</Typography>
                </Box>

                {/* offer2 */}

                <Box sx={StyleSheet.BankOffer}>
                  <Typography sx={StyleSheet.Tag}>
                    {" "}
                    <LocalOfferIcon />
                  </Typography>
                  <Typography sx={StyleSheet.offerTxt}>Bank Offer</Typography>
                  <Typography sx={StyleSheet.cardOffer}>
                    10% off on Flipkart Axis Bank Credit Card EMI Transactions,
                    up to ₹1,500 on orders of ₹5,000 and above
                  </Typography>
                  <Typography sx={StyleSheet.Tc}> T&C</Typography>
                </Box>

                {/* offer3 */}

                <Box sx={StyleSheet.BankOffer}>
                  <Typography sx={StyleSheet.Tag}>
                    {" "}
                    <LocalOfferIcon />
                  </Typography>
                  <Typography sx={StyleSheet.offerTxt}>Bank Offer</Typography>
                  <Typography sx={StyleSheet.cardOffer}>
                    10% off on Citi Credit Card EMI Transactions, up to ₹1,500
                    on orders of ₹5,000 and above
                  </Typography>
                  <Typography sx={StyleSheet.Tc}> T&C</Typography>
                </Box>

                <Box sx={StyleSheet.BankOffer}>
                  <Typography sx={StyleSheet.Tag}>
                    {" "}
                    <LocalOfferIcon />
                  </Typography>
                  <Typography sx={StyleSheet.offerTxt}>
                    Special Price
                  </Typography>
                  <Typography sx={StyleSheet.cardOffer}>
                    Get extra 13% off (price inclusive of cashback/coupon)
                  </Typography>
                  <Typography sx={StyleSheet.Tc}> T&C</Typography>
                </Box>

                {/* Warranty */}

                <Box sx={StyleSheet.warranty}>
                  <Typography sx={StyleSheet.Wtxt}>Warranty</Typography>{" "}
                  <Typography>NA</Typography>
                </Box>

                {/* Delivery  */}

                <Box sx={StyleSheet.warranty}>
                  <Typography sx={StyleSheet.Wtxt}>Delivery</Typography>
                  <Box sx={StyleSheet.formContainer}>
                    <FormControl variant="standard">
                      <Input
                        id="input-with-icon-adornment"
                        placeholder="Enter Delivery Pincode"
                        startAdornment={
                          <InputAdornment position="start">
                            <FmdGoodIcon />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end" component="div">
                            <Typography color="primary">Check</Typography>
                          </InputAdornment>
                        }
                      />

                      <Box sx={StyleSheet.Delivadd}>
                        <Typography sx={StyleSheet.DD}>
                          {" "}
                          Delivery by4 Dec, Monday
                        </Typography>
                        <Typography sx={StyleSheet.Free}> Free</Typography>
                        <Typography sx={StyleSheet.cost}>₹40</Typography>
                      </Box>
                      <Typography sx={StyleSheet.orderTime}>
                        if ordered before 11:59 PM
                      </Typography>
                      <Typography sx={StyleSheet.VD}>View Details</Typography>
                    </FormControl>
                  </Box>
                </Box>

                {/* Highlights */}

                <Box sx={StyleSheet.warranty}>
                  <Typography sx={StyleSheet.Wtxt}>Highlights</Typography>
                  <ul className="ul">
                    <li className="li">Effective Pixels: 1080 MP</li>
                  </ul>
                </Box>

                {/* Seller */}

                <Box sx={StyleSheet.warranty}>
                  <Typography sx={StyleSheet.Wtxt}>Seller</Typography>
                  <Box>
                    <Typography color={"primary"} ml={"-40px"}>
                      Dealsunlimited2022
                    </Typography>
                    <ul
                      style={{
                        display: "flex",
                      }}
                    >
                      <li>7 Days Replacement Policy</li>
                    </ul>
                  </Box>
                </Box>

                {/*  */}

                <Box></Box>
              </Box>
            </Box>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage;
