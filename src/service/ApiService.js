import axios from "../utils/axiosCustomize";

const getAllProducts = () => {
    return axios.get('api/v1/product/read');
};

export { getAllProducts };