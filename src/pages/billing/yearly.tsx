// NextJS import
import LoadingSpinner from '@/components/loadingSpinner';
import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';

// React import
import { useEffect, useLayoutEffect, useState } from 'react';

// Dependencies import
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from '@/components/paymentForm';
import { getProfile } from '@/api/profile/proifle';
import { VetState } from '@/types/vet';
import axios from 'axios';
import PaymentFormYearly from '@/components/paymentFormYearly';


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_DEFAULT_PUBLISHABLE_KEY as string
);

const BillingYearly: NextPage = () => {
    // Local state
    const [isLoading, setIsLoading] = useState(true)
    const [vet, setVet] = useState<VetState | null>(null)

    // Router
    const router = useRouter();


    useLayoutEffect(() => {
        (async () => {
            const token = localStorage.getItem("token")
            const user_id = localStorage.getItem("user_id")
            if (!token || !user_id || token === "" || user_id === "")
                return router.push("/auth")

            const profile = await getProfile()

            setVet(profile!)

            const response = await axios.get(`/api/getsubscription?email=${profile?.vetProfile.email}`)

            console.log(response.data === "active")

            if (response.data === "active") return router.replace("/dashboard")


            setIsLoading(false)
        })()
    }, [])


  
    if (isLoading) return <LoadingSpinner />


    return <div className='w-screen h-screen flex bg-bgColor items-center justify-center'>
        <Head>
            <title>Abonnement annuel</title>
        </Head>

        <div className='w-[40rem] h-[20rem] flex flex-col p-6 bg-white rounded-lg shadow-lg text-black items-center'>
            <span className='text-lg font-medium'>Abonnement annuel</span>

            <div className='mt-6' />

            <Elements stripe={stripePromise}>
                <PaymentFormYearly vet={vet?.vetProfile} />
            </Elements>

        </div>
    </div>
}

export default BillingYearly