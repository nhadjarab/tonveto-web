// NextJS import
import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';

// React import
import { useLayoutEffect, useState } from 'react';

// Dependencies import
import { Tab } from '@headlessui/react'

// Components import
import CreateClinic from '@/components/createClinic';
import LoadingSpinner from '@/components/loadingSpinner';

// API import
import { getProfile, getVetClinics } from '@/api/profile/proifle';
import JoinClinic from '@/components/joinClinic';





const ClinicOnboarding: NextPage = () => {

    const [selected, setSelected] = useState(0)
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

            console.log(profile)


            if (profile?.vetProfile.profile_complete && profile.vetProfile.is_approved) return router.replace("/dashboard")

            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length > 0) return router.replace("/onboarding/approval")

            if (!profile?.vetProfile.profile_complete) return router.replace("/onboarding")


            setIsLoading(false)

        })()
    }, [])

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Head>
                <title>Onboarding | Clinic</title>
            </Head>



            <div className='w-screen h-screen bg-bgColor flex justify-center items-center '>

                <div className='w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col'>

                    {/* Tabs */}
                    <Tab.Group


                    >
                        <Tab.List className=' w-[20rem] flex self-center items-center justify-center p-1 space-x-4 bg-gray-300 rounded-xl'>
                            <Tab onClick={() => setSelected(0)}
                                className={
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none  ${selected === 0
                                        ? 'bg-white shadow'
                                        : 'text-black hover:bg-white/[0.12] hover:text-white'}`

                                }>Create Clinic</Tab>
                            <Tab className={
                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none  ${selected === 1
                                    ? 'bg-white shadow'
                                    : 'text-black hover:bg-white/[0.12] hover:text-white'}`

                            } onClick={() => setSelected(1)}>Join Clinic</Tab>
                        </Tab.List>
                    </Tab.Group>

                    <div className='mb-2' />

                    {
                        selected === 0 ? (
                            <CreateClinic />
                        ) : (
                            <JoinClinic />
                        )
                    }


                </div>

            </div>


        </div >
    )
}

export default ClinicOnboarding