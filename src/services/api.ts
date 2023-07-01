import axios from "axios";
import { AppError } from "../utils/AppError";

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333'
});

// api.interceptors.request.use((config) => {
//     console.log(config, 'take inside api interceptors');
//     return config;
// }, (error) => {
//     return Promise.reject(error)
// })
// api.interceptors.response.use((response) => {
//     console.log(response, 'Response => take inside api interceptors');
//     return response;
// }, (error) => {
//     console.log(error.response.data, 'Error => take inside api interceptors');
//     return Promise.reject(error)
// })
api.interceptors.response.use(response => response, error => {
    if(error.response && error.response.data){
        return Promise.reject(new AppError(error.response.data.message))
    }else{
        return Promise.reject(error);
    }
});

export {api}