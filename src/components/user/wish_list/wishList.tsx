import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import NavBar from "../../navbar/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import SideBar from "../../common/sidebar.tsx/SideBar";
import { Styles } from "../../../styles/ProfileStyle";

const WishList = () => {
  const { wishList } = useSelector((state: RootState) => state.Ecommerce);
  return (
    <Box>
      <NavBar />
      <Container>
        <Grid container mt={10} spacing={2}>
          <Grid item xs={12} md={3.6}>
            <SideBar />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={Styles.wishListContainer}>
              <Typography sx={Styles.wishListTxt}>
                My WishList ({wishList.length})
              </Typography>
              <Divider />
              {wishList.map((item) => (
                <>
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    sx={Styles.prodItm}
                    gap={4}
                  >
                    <Box
                      component={"img"}
                      src={item.image}
                      sx={Styles.prodImg}
                    />
                    <Stack direction={"column"} alignItems={"flex-start"}>
                      <Typography sx={Styles.title}>
                        {item.title.slice(0, 40)}...
                      </Typography>
                      <Typography sx={Styles.price}> ₹{item.price}</Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                </>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WishList;
