import { Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { IState } from "./Types";
import BasicModal from "../../common/modal/Modal";
import { useDispatch } from "react-redux";
import { adminAddProduct } from "../../../redux/reducer/slice";

const AddProduct = () => {
  const Dispatch = useDispatch();

  //eslint-disable-next-line
  const [url, setUrl] = useState<IState["url"]>("");
  const [product] = useState<IState["addProduct"]>({
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const url: File = (event.target.files as FileList)[0];
    if (!url) return;
    setUrl(url && URL.createObjectURL(url));
  };

  const handlerAdd = () => {
    Dispatch(adminAddProduct(formData));
  };
  const handlerModify = (id: number) => {
    handleOpen();
    setFormData({ ...formData, productId: id });
  };

  console.log(formData, "jeldk");

  return (
    <>
      <Typography variant="h3">Add New Product</Typography>
      <BasicModal
        product={product}
        modifyFun={handlerModify}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handler={handleChange}
        formData={formData}
        uploadHandler={handleUpload}
        add={handlerAdd}
      />
    </>
  );
};

export default AddProduct;
