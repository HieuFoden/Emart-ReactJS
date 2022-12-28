import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import './Navbar.scss';
import { logoutUser, logoutContext } from "../../service/ApiService";
import { toast } from 'react-toastify';

const Navbar = () => {
    const state = useSelector((state) => state.handleCart);
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        let data = await logoutUser(); // xoa cookie
        localStorage.removeItem('jwt'); // xoa local storage
        logoutContext(); // xoa user in context
        if (data && +data.EC === 0) {
            toast.success('ログアウトしました');
            navigate('/login');
        } else {
            toast.error(data.EM);
        }
    };
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

                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">
                                    ホームページ
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    AKIについて
                                </NavLink>
                            </li>
                            {user && user.isAuthenticated === true &&
                                <li className="nav-item">
                                    {/* <NavLink className="nav-link" to="/users">
                                    ユーザー管理
                                </NavLink> */}

                                    <NavDropdown title="ユーザー管理" id="basic-nav-dropdown">
                                        <NavLink className="nav-link" to="/users">
                                            ユーザー 一覧
                                        </NavLink>
                                        <NavDropdown.Divider />
                                        <NavLink className="nav-link" to="/roles">
                                            役割
                                        </NavLink>
                                        <NavDropdown.Divider />

                                    </NavDropdown>
                                </li>
                            }
                        </ul>


                        <div className="buttons">
                            <NavLink to="/cart" className="nav-link">
                                <i className="fa fa-shopping-cart"> カート({state.length})</i>
                            </NavLink>
                        </div>

                        {user && user.isAuthenticated === true
                            ?
                            <>
                                <div className="private">
                                    <NavLink className="nav-link" to="/private">
                                        {user.account.username} さん ようこそ
                                    </NavLink>
                                </div>
                                <div className="drop-down">
                                    <NavDropdown title="設定" id="basic-nav-dropdown">
                                        <NavDropdown.Item>パスワード更新</NavDropdown.Item>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item >
                                            <span onClick={() => handleLogout()}>ログアウト</span>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>

                            </>
                            :
                            <div className="private">
                                <NavLink to="/login" className="btn btn-outline-dark">
                                    <i className="fa fa-sign-in me-1"> ログイン</i>
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark ms-2">
                                    <i className="fa fa-user-plus"> 登録</i>
                                </NavLink>
                            </div>

                        }



                    </div>
                </div>
            </nav >
        </div >

    );
};

export default Navbar;