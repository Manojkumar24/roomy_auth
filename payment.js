import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Payment() {
    const [orderId, setOrderId] = useState(null);

    const options = {
        key: "<razorpay-key>",
        amount: "5000",
        currency: "INR",
        name: "SpeakerOre",
        description: "Subscription plan payment",
        image: "something",
        order_id: orderId,
        prefill: {
            name: "Brijesh Bumrela",
            email: "brijesh@gmail.com",
            contact: "9999999999"
        },
        handler: async function (response){
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
            try {
                // If the payment is successful, this handler function will call the backend API to update the database
                const res = await axios.post("http://localhost:3000/api/payment", {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature 
                })
            } catch(e) {
                console.log(e);
            }
        },
        theme: {
            color: "#F37254"
        }
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    const fetchNewOrderID = async () => {
        const res = await axios.get("http://localhost:3000/api/payment");
        setOrderId(res.data.order_id);
    }
    // Get order_id
    useEffect(() => {
        fetchNewOrderID();
    }, [])

    const openPayModal = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    return (
        <button onClick={openPayModal}>Pay</button>
    )
}



ReactDOM.render(<Payment />, document.getElementById('root'));
