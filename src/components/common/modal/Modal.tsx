import * as React from "react";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { addUrl, editUrl } from "../../../utilities/constants";

interface Iprops {
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  add?: () => void;
  handlerToggler?: () => void;
  formData?: {
    productId?: number;
    productName?: string;
    description?: string;
    categoryImage?: string;
    productImage: string[];
    quantity?: number;
    price?: number;
    discount?: number;
    categoryName?: string;
    weight?: string;
    categoryId?: number;
  };
  ind?: number;
  isedit?: boolean;
  product: {
    productId: number;
    productName: string;
    description?: string;
    productImage: string[];
    quantity: number;
    price: number;
    discount?: number;
    productCreatedAt?: string;
    productUpdatedAt?: string;
    sellerId?: number;
    categoryId: number;
    categoryName?: string;
    categoryImage?: string;
    subCategoryId?: number;
    subCategoryName?: string;
    subCategoryImage?: string;
    sellerName?: string;
    businessName?: string;
    extraField?: null;
    averageRatings?: null;
    weight?: string;
    favorite?: boolean;
    active?: boolean;
    Actions?: { Edit: string; Delete: string };
  };
  modifyFun: (id: number) => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const Token = localStorage.getItem("authToken");

export default function BasicModal({
  handler,
  formData,
  uploadHandler,
  handlerToggler,
  isedit,
  open,
  handleOpen,
  handleClose,
  ind,
  product,
  modifyFun,
}: Readonly<Iprops>) {
  const handlerModifyProduct = async () => {
    const form = new FormData();

    form.append("productName", formData?.productName ?? "");
    form.append("productId", formData?.productId?.toString() ?? "");
    form.append("description", formData?.description ?? "");
    form.append("weight", formData?.weight + "");
    console.log(ind);
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      body: form,
    };

    const response = await fetch(
      editUrl + formData?.productId?.toString(),
      options
    );

    const res = await response.json();
    handleClose();
    return res;
  };

  const handlerAddNewProduct = async () => {
    const form: any = new FormData();
    form.append("productName", formData?.productName);
    form.append("categoryId", formData?.categoryId);
    form.append("description", formData?.description);
    form.append("price", 122);
    form.append("quantity", formData?.quantity);
    form.append("weight", formData?.weight);

    if (formData) {
      for (let image of formData.productImage) {
        form.append("productImage", image);
      }
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      body: form,
    };

    const response = await fetch(addUrl, options);
    const res = await response.json();

    return res;
  };

  const handlerData = (event: React.FormEvent) => {
    event.preventDefault();

    ind ? handlerModifyProduct() : handlerAddNewProduct();
  };

  return (
    <div>
      {ind ? (
        <Button
          variant="outlined"
          fullWidth
          onClick={() => modifyFun(product?.productId)}
        >
          Modify
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleOpen}>
          Add New
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handlerData}>
          <Stack direction={"row"} gap={2}>
            <TextField
              required
              fullWidth
              placeholder="enter  product name"
              name="productName"
              defaultValue={product?.productName}
              value={formData?.productName}
              onChange={handler}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextField
              placeholder="enter quantity"
              required
              name="quantity"
              defaultValue={product?.quantity}
              value={formData?.quantity}
              onChange={handler}
            />
            <TextField
              required
              placeholder="enter  weight"
              name="weight"
              defaultValue={product?.weight}
              value={formData?.weight}
              onChange={handler}
            />
          </Stack>
          <TextField
            placeholder="enter Product Description"
            fullWidth
            defaultValue={product?.description}
            name="description"
            value={formData?.description}
            onChange={handler}
          />
          <Stack gap={2} alignItems={"center"}>
            <Box
              placeholder="upload Image"
              component={"input"}
              onChange={uploadHandler}
              type="file"
              id="file"
            ></Box>
          </Stack>
          <TextField
            placeholder="enter  Category"
            defaultValue={product?.categoryName}
            name="category"
            value={formData?.categoryName}
            onChange={handler}
          />
          <Button variant="contained" type="submit">
            finish
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
