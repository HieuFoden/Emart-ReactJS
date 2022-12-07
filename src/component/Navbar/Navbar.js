import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">
                        AKI SHOP
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <input type='text'
                            placeholder="検索"
                            className="search mx-auto mb-2 mb-lg-0 "
                        // onChange={(event) => setQuery(event.target.value)}
                        />

                        <div className="buttons">
                            <NavLink to="/login" className="btn btn-outline-dark">
                                <i className="fa fa-sign-in me-1"> ログイン</i>
                            </NavLink>
                            <NavLink to="/register" className="btn btn-outline-dark ms-2">
                                <i className="fa fa-user-plus"> 登録</i>
                            </NavLink>
                            <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                                <i className="fa fa-shopping-cart"> カート(0)</i>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Navbar;