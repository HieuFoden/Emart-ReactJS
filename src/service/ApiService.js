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
};

const fetchGroups = () => {
    return axios.get(`api/v1/group/read`);
};

const createNewUser = (userData) => {
    return axios.post(`api/v1/user/create`, { ...userData });
};

const updateCurrentUser = (userData) => {
    return axios.put(`api/v1/user/update`, { ...userData });
};

const getUserAccount = () => {
    return axios.get(`api/v1/account`);
};

const logoutUser = () => {
    return axios.post(`api/v1/logout`);
};

const createRole = (roles) => {
    return axios.post(`api/v1/role/create`, [...roles]);
};

const fetchAllRoles = () => {
    return axios.get(`api/v1/role/read`);
};

const deleteRole = (role) => {
    return axios.delete('api/v1/role/delete', { data: { id: role.id } });
};

const fetchRolesByGroup = (groupId) => {
    return axios.get(`api/v1/role/by-group/${groupId}`);
};

const assignRoleToGroup = (data) => {
    return axios.post(`api/v1/role/assign-to-group`, { data });
};

export {
    fetchAllProducts, registerNewUser, loginUser, fetchDetailProduct, fetchAllUsers, deleteUser,
    fetchGroups, createNewUser, updateCurrentUser, getUserAccount, logoutUser, createRole, fetchAllRoles,
    deleteRole, fetchRolesByGroup, assignRoleToGroup
};