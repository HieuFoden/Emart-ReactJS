// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../service/ApiService";
// import ShowProducts from "./ShowProducts";

// const Product = () => {
//     // const [loading, setLoading] = useState(false);


//     // const [listProduct, setListProduct] = useState([]);
//     // useEffect(() => {
//     //     fetchListProducts();
//     // }, []);

//     // const fetchListProducts = async () => {
//     //     let response = await getAllProducts();
//     //     // console.log('>>>res: ', response)
//     //     if (response.EC === 0) {
//     //         setListProduct(response.DT);
//     //     }
//     // };

//     // const [data, setData] = useState(listProduct);
//     // const filterProduct = (catItem) => {
//     //     const updatedList = listProduct.filter((x) => {
//     //         return x.category === catItem;
//     //     });
//     //     setData(updatedList);
//     // }

//     // const ShowProducts = () => {

//     //     return (
//     //         <>
//     //             <div className="buttons d-flex justify-content-center mb-5 pb-5">
//     //                 <button className="btn btn-outline-dark me-2" onClick={() => setData(listProduct)}>すべて</button>
//     //                 <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>男性服</button>
//     //                 <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>女性服</button>
//     //                 <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("kid's clothing")}>子供服</button>
//     //                 <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>ジュエリー</button>
//     //             </div>


//     //             {listProduct.map((item, index) => {
//     //                 return (
//     //                     <>
//     //                         <div className="col-md-3 mb-4">
//     //                             <div className="card h-100 text-center p-4" key={item.id}>
//     //                                 <img src={item.image} className="card-img-top" alt={item.title} height="250px" />
//     //                                 <div className="card-body">
//     //                                     <h5 className="card-title mb-0">{item.title.substring(0, 9)}...</h5>
//     //                                     <p className="card-text lead fw-bold">¥ {item.price}</p>
//     //                                     <a href="#" className="btn btn-outline-dark">購入</a>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </>
//     //                 )
//     //             })
//     //             }

//     //         </>
//     //     );
//     // };
//     return (
//         <div>
//             <div className="container my-5 py-5">
//                 <div className="row">
//                     <div className=" col-12 mb-5">
//                         <h1 className="display-6 fw-bolder text-center">新製品</h1>
//                         <hr />
//                     </div>
//                 </div>
//                 <div className="row justify-content-center">
//                     <ShowProducts />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Product;