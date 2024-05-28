import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        // console.log('i am intercepted');

        const token = localStorage.getItem('access-token');
        // console.log(token)
        config.headers.authorization = `Barer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        // console.log('yesssss')
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },  async(error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log('i am in')
        const status = error.response.status;
        if(status === 401 || status === 403) {
            console.log('i am in')
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
      });
    return axiosSecure;
};

export default useAxiosSecure;