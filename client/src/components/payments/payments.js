import React, { Fragment } from 'react'
//import {  } from '../../actions/auth';


function LoadScript(src){
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src
        //document.body.appendChild(script)
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    
    })
}



function payments(){
    //const [state, setstate] = useState('Nehul')

    async function displayRazorpay(){
        const res = await LoadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
             alert('Razorpay SDK failed to load . Are you online..?')
             return
        }

        const data =await fetch('http://localhost:5000/razorpay', { method: 'POST'}).then((t) => 
         t.json()
         )
        console.log(data);
        console.log('front end !!!');
        const options = {
            key: "rzp_test_fvrtPHrPNkX4EA", // Enter the Key ID generated from the Dashboard
            amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: data.currency,
            name: "Donation",
            description: "thank you for ntg please give us more",
            image: "https://i.ibb.co/KqNwVNP/Capture1.jpg",
            order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            prefill: {
                //name
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            }
            // notes: {
            //     "address": "Razorpay Corporate Office"
            // },
            // theme: {
            //     "color": "#F37254"
            // }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return(
        <Fragment>
        <div className="payments">
            <p> hello </p>
            <a onClick={displayRazorpay}> Donate 500$ </a>
        </div>
        </Fragment>
    )


};

export default payments