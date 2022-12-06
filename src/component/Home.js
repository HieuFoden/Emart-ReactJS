import React from "react";
// import Product from "./Product";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../service/ApiService";
import './Home.scss';
import ReactPaginate from 'react-paginate';

const Home = () => {
    const [listProduct, setListProduct] = useState([]);
    const [filter, setFilter] = useState(listProduct);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(8);
    const [totalPage, setTotalPage] = useState(0);

    //LIST PRODUCT
    useEffect(() => {
        fetchListProducts();
    }, [currentPage]);

    const fetchListProducts = async () => {
        let response = await fetchAllProducts(currentPage, currentLimit);  //currentPage, currentLimit
        // console.log('>>>res: ', response)
        if (response.EC === 0) {
            // setListProduct(response.DT);
            // setFilter(response.DT);

            setTotalPage(response.DT.totalPage);
            setListProduct(response.DT.products);
            setFilter(response.DT.products);

        }
    };

    //CATEGORY
    const filterResult = (catItem) => {

        const result = listProduct.filter((item) => {
            return item.category === catItem;
        });
        setFilter(result);

        console.log('>>> check result : ', result)
    };

    //SEARCH
    const [query, setQuery] = useState('');
    // console.log('?>>check query : ', query);

    //PAGINATE
    const handlePageClick = async (event) => {
        // console.log('>>>check data click :', event);
        setCurrentPage(+event.selected + 1);
        // alert(event.selected);

    };

    return (
        <>

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

                            <input type='text'
                                placeholder="検索"
                                className="search mx-auto mb-2 mb-lg-0 "
                                onChange={(event) => setQuery(event.target.value)}
                            />

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


                            {filter.filter(item => item.title.toLowerCase().includes(query)).map((item, index) => {

                                return (
                                    <>
                                        <div className="col-md-3 mb-4" key={item.id}>
                                            <div className="card h-100 text-center p-4">
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

                        {totalPage > 0 &&
                            <div className="user-footer ">
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={2}
                                    marginPagesDisplayed={3}
                                    pageCount={totalPage}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }
                    </div>

                </div>

            </div>
        </>
    );
};

export default Home;

