import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Home from './component/Home/Home';
import Cart from './component/Cart/Cart';
import Product from './component/Product/Product';
import Users from './component/ManageUsers/Users';
import About from './component/About/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<App />} >
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/users' element={<Users />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>

      </BrowserRouter>

    </React.StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    {/* </Provider> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
