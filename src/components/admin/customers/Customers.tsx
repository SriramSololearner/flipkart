import { Box } from "@mui/material";
import CustomizedTables from "../../common/table/Table";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

const Customers = () => {
  const { users } = useSelector((state: RootState) => state.Ecommerce);
  return (
    <>
      <Box>All Cutomers</Box>
      <CustomizedTables data={users} />
    </>
  );
};

export default Customers;
