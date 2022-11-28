// import React, { useEffect, useState } from "react";
// import { getAllProducts } from "../service/ApiService";

// const ShowProducts = () => {
//     const [listProduct, setListProduct] = useState([]);

//     useEffect(() => {
//         fetchListProducts();
//     }, []);

//     const fetchListProducts = async () => {
//         let response = await getAllProducts();
//         // console.log('>>>res: ', response)
//         if (response.EC === 0) {
//             setListProduct(response.DT);
//         }
//     };
//     const [data, setData] = useState(listProduct);

//     const filterResult = (catItem) => {
//         const result = listProduct.filter((x) => {
//             return x.category === catItem;
//         });
//         setData(result);
//     }

//     return (
//         <>
//             <div className="buttons d-flex justify-content-center mb-5 pb-5">
//                 <button className="btn btn-outline-dark me-2" onClick={() => setData(listProduct)}>すべて</button>
//                 <button className="btn btn-outline-dark me-2" onClick={() => filterResult("men's clothing")}>男性服</button>
//                 <button className="btn btn-outline-dark me-2" onClick={() => filterResult("women's clothing")}>女性服</button>
//                 <button className="btn btn-outline-dark me-2" onClick={() => filterResult("kid's clothing")}>子供服</button>
//                 <button className="btn btn-outline-dark me-2" onClick={() => filterResult("jewelery")}>ジュエリー</button>
//             </div>


//             {listProduct.map((item, index) => {
//                 return (
//                     <>
//                         <div className="col-md-3 mb-4">
//                             <div className="card h-100 text-center p-4" key={item.id}>
//                                 <img src={item.image} className="card-img-top" alt={item.title} height="250px" />
//                                 <div className="card-body">
//                                     <h5 className="card-title mb-0">{item.title.substring(0, 9)}...</h5>
//                                     <p className="card-text lead fw-bold">¥ {item.price}</p>
//                                     <a href="#" className="btn btn-outline-dark">購入</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )
//             })
//             }
//         </>
//     )
// }

// export default ShowProducts;