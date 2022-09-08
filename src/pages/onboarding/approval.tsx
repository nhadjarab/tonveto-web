// NextJS import
import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// React import
import { useLayoutEffect, useState } from 'react';

// Components import
import LoadingSpinner from '@/components/loadingSpinner';

// API import
import { getProfile } from '@/api/profile/proifle';


const ApprovalOnboarding: NextPage = () => {

    // Local state
    const [isLoading, setIsLoading] = useState(true)


    // Router
    const router = useRouter();


    // UseEffects
    useLayoutEffect(() => {
        (async () => {
            const token = localStorage.getItem("token")
            const user_id = localStorage.getItem("user_id")
            if (!token || !user_id || token === "" || user_id === "")
                return router.push("/auth")

            const profile = await getProfile()


            if (profile?.vetProfile.profile_complete && profile.vetProfile.is_approved) return router.replace("/dashboard")

            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length == 0) return router.replace("/onboarding/clinic")

            if (!profile?.vetProfile.profile_complete) return router.replace("/onboarding")


            setIsLoading(false)

        })()
    }, [])


    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Head>
                <title>Onboarding | Approval</title>

            </Head>


            <div className='w-screen h-screen bg-bgColor flex flex-col items-center justify-center text-black'>
                <span>Your profile is all set, just wait for an admin to approve you!</span>
                <div className='relative w-[15rem] h-[15rem]'>

                    <Image layout='fill' className='w-[30px]' src="/success.svg" alt="Success" />
                </div>
            </div>

        </div>
    )
}

export default ApprovalOnboarding