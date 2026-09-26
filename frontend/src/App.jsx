import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MainLayout from "./components/MainLayout";
// import Cart from "./components/Cart";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoutes from "./components/AdminRoutes";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductList from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UsersListScreen from "./screens/admin/UsersListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import AddProductForm from "./screens/admin/AddProductForm";
import AuthGoogleSuccess from "./components/authGoogleSuccess";
import AuthGitHubSuccess from "./components/AuthGitHubSuccess";
import VerifyOtpScreen from "./screens/VerifyOtpScreen";
import InventoryListScreen from "./screens/inventory/InventoryListScreen";
import AddStockScreen from "./screens/inventory/AddStockScreen";
// import GoogleLogin from "./components/GoogleLogin";

// import { GoogleOAuthProvider } from "@react-oauth/google";

// const GoogleAuthWrapper = () => {
//   return (
//     <GoogleOAuthProvider>
//       <GoogleLogin></GoogleLogin>
//     </GoogleOAuthProvider>
//   );
// };

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "page/:pageNumber", element: <HomeScreen /> },
      { path: "search/:keyword", element: <HomeScreen /> },
      { path: "search/:keyword/page/:pageNumber", element: <HomeScreen /> },
      { path: "product/:id", element: <ProductScreen /> },
      { path: "login", element: <LoginScreen /> },
      // { path: "googleLogin", element: <GoogleLogin /> },
      { path: "register", element: <RegisterScreen /> },
      { path: "auth-google-success", element: <AuthGoogleSuccess /> },
      { path: "auth-github-success", element: <AuthGitHubSuccess /> },
      { path: "verify-email", element: <VerifyOtpScreen /> },

      {
        element: <PrivateRoutes />,
        children: [
          { path: "shipping", element: <ShippingScreen /> },
          { path: "payment", element: <PaymentScreen /> },
          { path: "cart", element: <CartScreen /> },
          { path: "placeorder", element: <PlaceOrderScreen /> },
          { path: "order/:id", element: <OrderScreen /> },
          { path: "/profile", element: <ProfileScreen /> },
        ],
      },
      {
        element: <AdminRoutes />,
        children: [
          { path: "admin/orderslist", element: <OrderListScreen /> },
          { path: "admin/productlist", element: <ProductList /> },
          { path: "admin/productlist/:pageNumber", element: <ProductList /> },
          { path: "admin/userslist", element: <UsersListScreen /> },
          {
            path: "admin/product/:id/edit",
            element: <ProductEditScreen />,
          },
          { path: "/admin/user/:id/edit", element: <UserEditScreen /> },
          { path: "admin/product/create", element: <AddProductForm /> },
          { path: "inventory", element: <InventoryListScreen /> },
          { path: "inventory/add-stock/:id", element: <AddStockScreen /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
