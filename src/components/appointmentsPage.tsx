// React import
import { FunctionComponent, useEffect, useState } from "react";

// API import
import { getProfile } from "@/api/profile/proifle";
import { Appointment } from "@/types/vet";

//Dependcies import
import Lottie from "react-lottie";

import noAppointments from "@Lotties/no-appointments.json";
import { lottieConfig } from "@/lotties/defaultConfig";



const AppointmentsPage: FunctionComponent = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isFetching, setIsFetching] = useState(false)

    const loadAppointments = async () => {
        try {
            setIsFetching(true)
            const profile = await getProfile()
            setAppointments(profile?.vetProfile.appointments!)
            setIsFetching(false)
        } catch (err) {
            setIsFetching(false)
            console.log(err)

        }
    }

    useEffect(() => {

        (async () => {
            await loadAppointments()
        })()

    }, [])


    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">
        <span className="text-[1.5rem] font-medium">Appointments Page</span>


        {
            appointments.length === 0 ?
                <div className="w-full h-full flex flex-col items-center justify-center">

                    <Lottie
                        options={lottieConfig(noAppointments)}
                        height={300}
                        width={300}
                    />
                    <span className="font-medium">There are no appointments</span>
                    <button disabled={isFetching} onClick={loadAppointments} className={`  p-2 bg-black rounded-lg text-white ${isFetching && "bg-gray-400 cursor-not-allowed"}`}>{isFetching ? "Loading..." : "Refresh"}</button>
                </div> : <span>Who knows mate</span>
        }

    </div>
}

export default AppointmentsPage;