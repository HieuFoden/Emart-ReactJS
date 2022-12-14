import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delItem } from "../../redux/action/index";
import { NavLink } from "react-router-dom";

const Cart = (props) => {
    const state = useSelector((state) => state.addItem);
    const dispatch = useDispatch();

    const handleClose = (item) => {
        dispatch(delItem(item));
    };
    const cartItems = (item) => {

        return (
            <div className="px-4 my-5 bg-light rounded-3" key={item.id}>
                <div className="container py-4">
                    <button onClick={() => handleClose(item)} className="btn-close float-end " aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={item.image} alt={item.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{item.title}</h3>
                            <p className="lead fw-bold">¥{item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>カートに製品はありません</h3>
                    </div>
                </div>
            </div>
        );
    };

    const button = () => {
        return (
            <div className="container">
                <div className="row">
                    <NavLink to='/checkout' className="btn btn-outline-primary mb-5 w-25 mx-auto">チェックアウトに進む</NavLink>
                </div>
            </div>
        );
    };

    return (
        <>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            {state.length !== 0 && button()}
        </>
    );
};

export default Cart;