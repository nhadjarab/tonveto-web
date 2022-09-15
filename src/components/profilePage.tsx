// React import
import { FunctionComponent, useEffect, useState } from "react";

// API import
import { getProfile } from "@/api/profile/proifle";
import { Appointment, VetAuth, VetState } from "@/types/vet";

//Dependcies import
import Lottie from "react-lottie";

import noAppointments from "@Lotties/no-appointments.json";
import { lottieConfig } from "@/lotties/defaultConfig";
import ProfileComponent from "./profileComponent";
import LoadingSpinner from "./loadingSpinner";



const ProfilePage: FunctionComponent = () => {
    const [user, setUser] = useState<VetState | null>(null);
    const [isFetching, setIsFetching] = useState(false)

    const loadProfile = async () => {
        try {
            setIsFetching(true)
            const profile = await getProfile()
            setUser(profile!)
            setIsFetching(false)
        } catch (err) {
            setIsFetching(false)
            console.log(err)

        }
    }

    useEffect(() => {

        (async () => {
            await loadProfile()
        })()

    }, [])


    if(isFetching) return <LoadingSpinner />


    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">
        <span className="text-[1.5rem] font-medium">Profile</span>

        <div className="mt-4" />

        <ProfileComponent user={user!} />

    </div>
}

export default ProfilePage;