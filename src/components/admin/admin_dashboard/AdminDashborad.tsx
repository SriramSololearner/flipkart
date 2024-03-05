import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { Styles } from "../../../styles/HomePage";
import BasicModal from "../../common/modal/Modal";
import { ChangeEvent, useState } from "react";
import {
  deleteProduct,
  emptySellerProductMsg,
  fetchApiCall,
} from "../../../redux/reducer/slice";
import { IState } from "../add_product/Types";
import { all } from "axios";

interface Istate {
  isedit: boolean;
}

const AdminHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allProducts, sellerProductMesage } = useSelector(
    (state: RootState) => state.Ecommerce
  );

  console.log(allProducts?.length);

  const handlerAdminDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  if (sellerProductMesage === "products deleted Successfully!") {
    dispatch(fetchApiCall());
    dispatch(emptySellerProductMsg());
  }
  const [formData, setFormData] = useState<IState["addProduct"]>({
    productId: 0,
    productName: "",
    desc: "",
    price: 0,
    weight: "",
    quantity: 0,
    date: "",
    category: "",
    categoryId: 135,
    productImage: [""],
  });

  const [isEdit, setIsEdit] = useState<Istate["isedit"]>(false);
  const handleEdit = () => {
    setIsEdit(true);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlerModify = (id: number) => {
    handleOpen();
    setFormData({ ...formData, productId: id });
  };

  return (
    <Box>
      <Typography>Admin dashBoard</Typography>
      <Grid container spacing={2}>
        {allProducts && allProducts.length === undefined ? (
          <Box>No data found!!</Box>
        ) : (
          allProducts?.map(
            (item) =>
              item.productId > 0 && (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.productId}>
                  <Card sx={Styles.cardContainer}>
                    {item.productImage[0] ? (
                      <Box
                        sx={Styles.imgContainer}
                        component="img"
                        src={item.productImage[0]}
                      />
                    ) : (
                      <Box
                        sx={Styles.imgContainer}
                        component="img"
                        src={item.categoryImage}
                      />
                    )}

                    <CardContent sx={Styles.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={Styles.cardTitle}
                      >
                        {item.description === undefined
                          ? "No description"
                          : item.description}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={Styles.cardTitle}
                      >
                        {item.productName === "" ? "----" : item.productName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight="text.high"
                      >
                        ₹{item.price}
                      </Typography>

                      <Stack gap={2}>
                        {" "}
                        <BasicModal
                          ind={item.productId}
                          product={item}
                          isedit={isEdit}
                          formData={formData}
                          handlerToggler={handleEdit}
                          handler={handleChange}
                          modifyFun={handlerModify}
                          open={open}
                          handleOpen={handleOpen}
                          handleClose={handleClose}
                        />
                        <Button
                          variant="outlined"
                          onClick={() => handlerAdminDelete(item.productId)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
          )
        )}
      </Grid>
    </Box>
  );
};

export default AdminHome;
