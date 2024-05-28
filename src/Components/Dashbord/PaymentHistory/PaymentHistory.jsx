import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure(`/payment/${user?.email}`)
        .then(res => {
            setPayments(res.data)
        })
    }, [user, axiosSecure])
    console.log(payments)
    return (
        <div>
            {
                payments.length
            }
            
        </div>
    );
};

export default PaymentHistory;