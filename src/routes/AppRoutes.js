import App from "../App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../component/Login/Login";
import Register from '../component/Register/Register';
import NotFoundPage from '../component/404/NotFoundPage';
import Home from '../component/Home/Home';
import Cart from '../component/Cart/Cart';
import Product from '../component/Product/Product';
import Users from '../component/ManageUsers/Users';
import About from '../component/About/About';
import Checkout from '../component/Checkout/Checkout';
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
    return (
        <>
            <Routes>
                <Route path='' element={<App />} >
                    <Route index element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/product/:id' element={<Product />} />
                    {/* <Route path='/users' element={<Users />} /> */}
                    <Route path="/users" element={<PrivateRoutes><Users /></PrivateRoutes>} />
                    <Route path='/about' element={<About />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </>
    );

};
export default AppRoutes;