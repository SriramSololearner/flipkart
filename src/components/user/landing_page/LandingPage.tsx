import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import {
  addCart,
  addWishlist,
  decreaseQty,
  fetchData,
  increaseQty,
  removeFromCart,
  removeFromWishList,
} from "../../../redux/reducer/slice";
import { Styles } from "../../../styles/HomePage";
import { ShoppingCart } from "@mui/icons-material";

import NavBar from "../../navbar/NavBar";
import { useNavigate } from "react-router-dom";

const notify = () => toast.success("Item Added into cart!");

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, cart, isAdded, isLoading, status, wishList, addWishList } =
    useSelector((state: RootState) => state.Ecommerce);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleInc = (id: number) => {
    dispatch(increaseQty(id));
  };

  const handleDec = (id: number) => {
    const product = cart.find((obj) => obj.id === id);
    if (product && product.qty === 1) dispatch(removeFromCart(id));
    else dispatch(decreaseQty(id));
  };

  const handleAddCart = (product: {
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
  }) => {
    dispatch(addCart({ ...product, qty: 1 }));
    notify();
  };

  const handleWishList = (product: {
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
  }) => {
    dispatch(addWishlist(product));
  };

  const handleRemoveWishList = (id: number) => {
    dispatch(removeFromWishList(id));
  };

  return (
    <>
      <NavBar />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Container maxWidth={"xl"} sx={Styles.root}>
        <h1>Welcome to our store!</h1>
        {isLoading && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {status === "failed" && <Box>SomeThing Went WRong!!!</Box>}

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={Styles.cardContainer}>
                {wishList.find((obj) => obj.id === product.id) &&
                addWishList ? (
                  <FavoriteIcon
                    sx={Styles.favIcons}
                    onClick={() => handleRemoveWishList(product.id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={Styles.favBorderIcon}
                    onClick={() => handleWishList(product)}
                  />
                )}
                <CardActionArea>
                  <Box
                    sx={Styles.imgContainer}
                    component="img"
                    onClick={() => navigate(`/Product/${product.id}`)}
                    src={product.image}
                    alt="product-img"
                  />
                  <CardContent sx={Styles.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={Styles.cardTitle}
                    >
                      {product.category}
                    </Typography>
                    <Typography sx={Styles.cardDesc}>
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="text.high"
                    >
                      ₹{product.price}
                    </Typography>
                    <Stack sx={Styles.StackContainer}>
                      <Box>
                        <Rating
                          name="read-only"
                          value={product.rating.rate}
                          sx={Styles.rating}
                          readOnly
                        />
                      </Box>

                      <Box sx={Styles.btnGrp}>
                        {cart.find((ob) => ob.id === product.id) && isAdded ? (
                          <Box sx={Styles.btnInner}>
                            <Button
                              sx={Styles.button}
                              variant="outlined"
                              onClick={() => handleDec(product.id)}
                            >
                              -
                            </Button>

                            <Box sx={Styles.qty}>
                              {cart.find((obj) => obj.id === product.id)?.qty}
                            </Box>
                            <Button
                              sx={Styles.button}
                              variant="outlined"
                              onClick={() => handleInc(product.id)}
                            >
                              +
                            </Button>
                          </Box>
                        ) : (
                          <IconButton
                            sx={Styles.cartIcon}
                            onClick={() => handleAddCart(product)}
                          >
                            <ShoppingCart />
                          </IconButton>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
