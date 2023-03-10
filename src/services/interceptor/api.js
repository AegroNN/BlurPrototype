import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5208/api',
    headers:{
        accept:'application/json',
        'Content-Type': 'application/json',
    },
});