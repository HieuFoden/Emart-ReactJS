import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailProduct } from "../../service/ApiService";
import { NavLink } from "react-router-dom";
import { addCart, delCart } from '../../redux/action/index';

const Product = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [cartBtn, setCartBtn] = useState("カートに入れる");

    const dispatch = useDispatch();
    const handleCart = (product) => {
        if (cartBtn === "カートに入れる") {
            dispatch(addCart(product));
            setCartBtn("カートに削除する");
        } else {
            dispatch(delCart(product));
            setCartBtn("カートに入れる");
        }

    };

    useEffect(() => {
        getDetailProduct();
    }, []);

    const getDetailProduct = async () => {
        let response = await fetchDetailProduct(id);
        // console.log('>>>res: ', response)
        if (response.EC === 0) {
            setProduct(response.DT);

        }
    };

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    <div className="col-md-6">
                        <img src={product.image} alt={product.title} height='400px' width='400px' />
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-uppercase text-black-50">{product.category}</h4>
                        <h1 className="display-5">{product.title}</h1>
                        <p className="lead fw-bolder">
                            Rating {product.rating}<i className="fa fa-star"></i>
                        </p>
                        <h3 className="display-6 fw-bold my-4">¥ {product.price}</h3>
                        <p className="lead">{product.description}</p>
                        <button className="btn btn-outline-dark ms-2" onClick={() => handleCart(product)}>{cartBtn}</button>
                        <NavLink to='/cart' className=" btn btn-outline-dark ms-2">カートを見る</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;