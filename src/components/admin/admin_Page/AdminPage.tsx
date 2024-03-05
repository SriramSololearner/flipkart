import { Box } from "@mui/material";
import { AdminNav } from "../admin_nav/AdminNav";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/Store";
import { useEffect } from "react";
import { fetchApiCall } from "../../../redux/reducer/slice";

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchApiCall());
  }, []);

  return (
    <Box>
      <AdminNav />
    </Box>
  );
};

export default AdminPage;
