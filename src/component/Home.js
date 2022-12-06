import React from "react";
// import Product from "./Product";
import { useEffect, useState } from "react";
import { getAllProducts } from "../service/ApiService";
// import './Home.scss';

const Home = () => {

    const [listProduct, setListProduct] = useState([]);
    const [filter, setFilter] = useState(listProduct);

    useEffect(() => {
        fetchListProducts();
    }, []);

    const fetchListProducts = async () => {
        let response = await getAllProducts();
        // console.log('>>>res: ', response)
        if (response.EC === 0) {
            setListProduct(response.DT);
            setFilter(response.DT);

        }
    };

    const filterResult = (catItem) => {

        const result = listProduct.filter((item) => {
            return item.category === catItem;
        });
        setFilter(result);

        console.log('>>> check result : ', result)
    };

    return (
        <div className="hero">
            <div className="card bg-dark text-white border-0">
                <img src="/assets/bg.png" className="card-img" alt="Background" height="550px" />
                <div className="card-img-overlay">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">新しいシーズン. スタート</h5>
                    </div>
                </div>
            </div>
            {/* <Product /> */}

            <div>
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className=" col-12 mb-5">
                            <h1 className="display-6 fw-bolder text-center">新製品</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {/* <ShowProducts /> */}

                        <div className="buttons d-flex justify-content-center mb-5 pb-5">
                            <button className="btn btn-outline-dark me-2" onClick={() => setFilter(listProduct)}>すべて</button>
                            <button className="btn btn-outline-dark me-2" onClick={() => filterResult(`men's clothing`)}>男性服</button>
                            <button className="btn btn-outline-dark me-2" onClick={() => filterResult(`women's clothing`)}>女性服</button>
                            <button className="btn btn-outline-dark me-2" onClick={() => filterResult(`kid's clothing`)}>子供服</button>
                            <button className="btn btn-outline-dark me-2" onClick={() => filterResult(`jewelery`)}>ジュエリー</button>
                        </div>


                        {filter.map((item, index) => {

                            return (
                                <>
                                    <div className="col-md-3 mb-4">
                                        <div className="card h-100 text-center p-4" key={item.productId}>
                                            <img src={item.image} className="card-img-top" alt={item.title} height="250px" />
                                            <div className="card-body">
                                                <h5 className="card-title mb-0">{item.title.substring(0, 9)}...</h5>
                                                <p className="card-text lead fw-bold">¥ {item.price}</p>
                                                <a href="#" className="btn btn-outline-dark">購入</a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

