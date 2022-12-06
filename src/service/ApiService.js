import axios from "../utils/axiosCustomize";

const fetchAllProducts = (page, limit) => {
    // return axios.get(`api/v1/product/read`);
    return axios.get(`api/v1/product/read?page=${page}&limit=${limit}`); //template string js
};

export { fetchAllProducts };