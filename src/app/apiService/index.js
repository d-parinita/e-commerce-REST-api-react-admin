import axios from "axios"
import { apiConstants } from "../utils/apiConstants"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ecommerceApi = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

ecommerceApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") 
    if (token) {
        config.headers.Authorization = token
    }
    return config
    }, (error) => Promise.reject(error)
)

ecommerceApi.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if(error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/signin"
        }
        return Promise.reject(error)
    }
)

export const signIn = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.SIGNIN, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const signOut = async() => {
    try {
        const data = await ecommerceApi.get(apiConstants.SIGNOUT)
        return data
    } catch (error) {
        throw error
    }
} 