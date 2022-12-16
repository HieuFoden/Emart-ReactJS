import axios from "../utils/axiosCustomize";

const fetchAllProducts = (page, limit) => {
    // return axios.get(`api/v1/product/read`);
    return axios.get(`api/v1/product/read?page=${page}&limit=${limit}`); //template string js
};

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, phone, username, password
    });
};

const loginUser = (valueLogin, password) => {
    return axios.post('api/v1/login', {
        valueLogin, password
    });
};

const fetchDetailProduct = (id) => {
    return axios.get(`api/v1/product/read/${id}`);

};

const fetchAllUsers = (page, limit) => {
    return axios.get(`api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete('api/v1/user/delete', { data: { id: user.id } });
    // return axios.delete('api/v1/user/delete', { id: user });
};

const fetchGroups = () => {
    return axios.get(`api/v1/group/read`);
};

export { fetchAllProducts, registerNewUser, loginUser, fetchDetailProduct, fetchAllUsers, deleteUser, fetchGroups };