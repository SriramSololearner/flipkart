import { Box } from "@mui/material";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/Store";
import { removeAll } from "../../redux/reducer/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.Ecommerce);
  const dispatch = useDispatch<AppDispatch>();
  const [Razorpay] = useRazorpay();

  let total: any = cart.reduce((acc, val) => {
    return acc + val.price * val.qty;
  }, 0);

  let Discount: number = (total / 100) * 25;
  let Total = Math.round(total - Discount);

  const notify = () => toast("Payment success!");

  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_68uMD0pCytYXta",
      amount: `${Total * 100}`,
      currency: "INR",
      name: "RazorPay",
      description: "Test Transaction",
      image: "",
      order_id: "",
      handler: (response: any) => {
        dispatch(removeAll());
        navigate("/");
        console.log("data");
        setTimeout(() => {
          notify();
        }, 5000);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzpay.on("payment.success", function (response: any) {
      console.log(response);
    });

    rzpay.open();
  }, [Razorpay, Total, dispatch, navigate]);

  const handleOrder = () => {
    const user = localStorage.getItem("token");
    if (user) {
      handlePayment();
    } else {
      navigate("/signin");
    }
  };
  return (
    <>
      <Box onClick={handleOrder}>Continue</Box>
      <ToastContainer />
    </>
  );
};

export default Payment;
