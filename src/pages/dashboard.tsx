// NextJS import
import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';

// React import
import { useLayoutEffect, useState } from 'react';

// Dependencies import
import { getProfile } from '@/api/profile/proifle';
import { useRecoilState } from 'recoil'

// Atoms import
import { userState } from '@/recoil/atoms';

const Dashboard: NextPage = () => {

    // Recoil State
    const [user, setUser] = useRecoilState(userState)

    // Router
    const router = useRouter();

    useLayoutEffect(() => {
        (async () => {
            const token = localStorage.getItem("token")
            const user_id = localStorage.getItem("user_id")
            if (!token || !user_id || token === "" || user_id === "")
                return router.push("/auth")

            const profile = await getProfile()

            setUser(profile!)

            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length == 0) return router.replace("/onboarding/clinic")
            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length > 0) return router.replace("/onboarding/clinic")
            if (!profile?.vetProfile.profile_complete) return router.push("/onboarding")





        })()
    }, [])

    return <div>
        <Head><title>Dashboard</title></Head>


    </div>
}

export default Dashboard