import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

// Cho phep trao doi cookie giua BE vs FE
instance.defaults.withCredentials = true;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response && response.data ? response.data : response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
// });

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
}, function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // Do something with response error
    const status = err && err.response && err.response.status || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error('無認証');
            return Promise.reject(err);
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error('無認可');
            return Promise.reject(err);
        }

        // bad request
        case 400: {
            return Promise.reject(err);
        }

        // not found
        case 404: {
            return Promise.reject(err);
        }

        // conflict
        case 409: {
            return Promise.reject(err);
        }

        // unprocessable
        case 422: {
            return Promise.reject(err);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err);
        }
    }
});


export default instance;