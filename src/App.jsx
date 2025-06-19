

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./pages/loginPage";
import Signup from "./pages/singUp";
import AdminPage from "./pages/adminPage";
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/testPage";
import ProductPage from "./pages/client/productPage"; // Import this!
import AdminProductPage from "./pages/admin/productPage";
import AddProductPage from "./pages/admin/addProductPage";
import EditProductPage from "./pages/admin/editProductPage";
import Users from "./pages/userPage";
import ProductOverviewPage from "./pages/client/productOverview";
import CartPage from "./pages/client/cart";
import CheckoutPage from "./pages/client/checkOut";
import SearchProductPage from "./pages/client/searchProducts";
 
function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<ProductPage />} /> 
            <Route path="products" element={<ProductPage />} />
            <Route path="/search" element={<SearchProductPage/>}/>
            <Route path="*" element={<h1 className="pt-[80px]">Not Found!!</h1>} />
            <Route path="overview/:id" element={<ProductOverviewPage/>} />
            <Route path="cart" element={<CartPage/>}></Route>
            <Route path="/checkout" element={<CheckoutPage/>}/>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin" element={<AdminPage />} >
            <Route path="users" element={<Users/>} />
            <Route path="products" element={<AdminProductPage />} />
            <Route path="add-product" element={<AddProductPage/>}/>
            <Route path="edit-product" element={<EditProductPage/>}/>
          </Route>

          <Route path="/testing" element={<TestPage/>} />     
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
