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

// Components import
import SideBar from '@/components/sideBar';
import AppointmentsPage from '@/components/appointmentsPage';
import SpecialtiesPage from '@/components/specialtiesPage';
import SettingsPage from '@/components/settingsPage';
import WorkingHoursPage from '@/components/workingHoursPage';
import ClinicsPage from '@/components/clinicsPage';
import ProfilePage from '@/components/profilePage';
import LoadingSpinner from '@/components/loadingSpinner';

const Dashboard: NextPage = () => {

    // Recoil State
    const [user, setUser] = useRecoilState(userState)
    const [active, setActive] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

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

            if (profile?.vetProfile.is_approved) return

            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length == 0) return router.replace("/onboarding/clinic")
            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length > 0) return router.replace("/onboarding/clinic")
            if (!profile?.vetProfile.profile_complete) return router.push("/onboarding")


            setIsLoading(false)


        })()
    }, [])



    const renderPages = () => {
        switch (active) {
            case 0:
                return <AppointmentsPage />
            case 1:
                return <ClinicsPage />
            case 2:
                return <WorkingHoursPage />
            case 3:
                return <SpecialtiesPage />
            case 4:
                return <ProfilePage />
            case 5:
                return <SettingsPage />
            default:
                return <AppointmentsPage />
        }
    }

    if(isLoading) return <LoadingSpinner />
    
    return <div className="bg-bgColor flex">
        <Head><title>Dashboard</title></Head>

        <SideBar active={active} setActive={setActive} />

        {renderPages()}

    </div>
}

export default Dashboard