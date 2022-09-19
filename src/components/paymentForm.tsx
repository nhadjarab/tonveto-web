import { VetProfile } from "@/types/vet";
import {
    CardElement,
    PaymentElement,
    PaymentRequestButtonElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    vet: VetProfile
}

const PaymentForm: FunctionComponent<Props> = ({
    vet
}) => {

    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false)

    const createSubscription = async () => {
        setIsLoading(true)
        try {
            const paymentMethod = await stripe!.createPaymentMethod({
                card: elements!.getElement("card"),
                type: "card",
            });
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: vet.first_name + " " + vet.last_name,
                    email: vet.email,
                    paymentMethod: paymentMethod.paymentMethod.id,
                }),
            });
            if (!response.ok) {
                setIsLoading(false)
                return toast.error("Payment failed");
            }
            const data = await response.json();
            const confirm = await stripe!.confirmCardPayment(data.clientSecret);
            if (confirm.error) {
                setIsLoading(false)
                return toast.error("Payment failed");
            }
            toast.success("Payment Successful! Subscription active.");
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)

            console.error(err);
            toast.error("Payment failed! " + JSON.stringify(err.message));
        }
    };

    return <div className="w-[15rem] mt-[3rem]">
        <CardElement className="bg-gray-200 rounded-lg p-4" />
        <br />
        <div className="w-full flex items-center justify-center">
            <button
             disabled={!stripe || isLoading}
             onClick={async () => {
                createSubscription()
            }} className={`p-2 bg-black text-white rounded-lg ${ isLoading && "bg-gray-400 cursor-not-allowed" }`}>Subscribe - 2 Euro/Month</button>
        </div>
    </div>
}

export default PaymentForm