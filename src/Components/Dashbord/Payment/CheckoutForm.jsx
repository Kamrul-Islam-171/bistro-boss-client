import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import useCart from './../../../Hooks/useCart';
import { AuthContext } from "../../../Provider/AuthProvider";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext);

    const [cart, refetch] = useCart();
    const price = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (price > 0) {
            const res = axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmEroor } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmEroor) {
            console.log(confirmEroor)
        }
        else {
            console.log('paymentIntent = ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction = ', paymentIntent.id);
                const payment = {
                    email: user?.email,
                    price: price,
                    date : new Date(),
                    transactionId: paymentIntent.id,
                    cartIds: cart.map(item => item._id),
                    menuItems: cart.map(item => item.menuId),
                    status: 'Pending'
                }
                const res = await axiosSecure.post('/payment', payment);
                console.log(res.data);
                refetch()
            }
        }
    }
    return (
        <div className="my-10 px-20">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;