import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from './../Provider/AuthProvider';


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);

    const {data : cartData = [], refetch} = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async() => {
           const {data} = await axiosSecure.get(`/carts?email=${user.email}`);
           return data;
        }

    })


    return [cartData, refetch];
};

export default useCart;