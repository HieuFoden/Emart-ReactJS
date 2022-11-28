import React from "react";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <a className="navbar-brand fw-bold fs-4" href="#">
                        AKI SHOP
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    ホームページ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    プロダクト
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    AKIについて
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    連絡
                                </a>
                            </li>
                        </ul>
                        <div className="buttons">
                            <a href="" className="btn btn-outline-dark">
                                <i className="fa fa-sign-in me-1"> ログイン</i>
                            </a>
                            <a href="" className="btn btn-outline-dark ms-2">
                                <i className="fa fa-user-plus"> 登録</i>
                            </a>
                            <a href="" className="btn btn-outline-dark ms-2">
                                <i className="fa fa-shopping-cart"> カート(0)</i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;