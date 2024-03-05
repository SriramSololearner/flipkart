import "../../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../components/login/LoginPage";
import SignUpPage from "../../components/registration/SignUpPage";
import LandingPage from "../../components/user/landing_page/LandingPage";
import Cart from "../../components/user/cart_list/Cart";
import ProductPage from "../../components/user/single_product/ProductPage";
import ProtectedRoute from "../protected_route/ProtectedRoute";
import ProfilePage from "../../components/user/profile_page/ProfilePage";
import WishList from "../../components/user/wish_list/wishList";
import AdminPage from "../../components/admin/admin_Page/AdminPage";

function RoutesPage() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />

            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/wishList" element={<WishList />} />
          </Route>
          <Route path="/Product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesPage;
