// React import
import { FunctionComponent, useEffect, useState } from "react";

// API import
import { getProfile } from "@/api/profile/proifle";
import { Appointment } from "@/types/vet";

//Dependcies import
import Lottie from "react-lottie";
import { If, Then, Else } from 'react-if'

import noAppointments from "@Lotties/no-appointments.json";
import { lottieConfig } from "@/lotties/defaultConfig";
import CloseTimeslotModal from "./closeTimeslotModal";
import moment from "moment";
import { parseDate } from "@/helpers/parseDate";
import { cancelAppointment, openTimeSlot } from "@/api/appointments/appointments";
import { toast } from "react-toastify";
import UpdateAppointmentModal from "./updateAppointmentModal";
import NewAppointmentModal from "./newAppointmentModal";

import { useRecoilState } from "recoil"
import { selectedAppointmentAtom } from "@/recoil/atoms"
import MedicalReportModal from "./medicalReportModal";
import LoadingSpinner from "./loadingSpinner";
import AreYouSurePopUp from "./areYouSurePopUp";

const AppointmentsPage: FunctionComponent = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isFetching, setIsFetching] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false)
    const [isMedicalReportModalOpen, setIsMedicalReportModalOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [closedAppointments, setClosedAppointments] = useState<Appointment[]>([])
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
    const [pastAppointments, setPastAppointments] = useState<Appointment[]>([])

    const [selectedAppointment, setSelectedAppointment] = useRecoilState(selectedAppointmentAtom)

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


    const handleOpenTimeslot = async (date: string, time: string) => {
        try {
            const result = await openTimeSlot(date, time)

            if (result && result.status === 200) {
                toast.success("Timeslot closed successfully")
                await loadAppointments()
            }


        } catch (e) {
            console.log(e)
            toast.error(JSON.stringify(e))
        }
    }

    const handleCancelAppointment = async (appointmentId: string) => {
        try {
            const result = await cancelAppointment(appointmentId)

            if (result && result.status === 200) {
                toast.success("Appointment Canceled successfully")
                await loadAppointments()
            }


        } catch (e) {
            console.log(e)
            toast.error(JSON.stringify(e))
        }
    }

    useEffect(() => {

        (async () => {
            await loadAppointments()
        })()

    }, [])

    useEffect(() => {
        if (appointments.length === 0) return

        const closedTimeSlots = appointments.filter((appointment) => appointment.pet_id === (process.env.NEXT_PUBLIC_DEFAULT_PET as string) && appointment.user_id === process.env.NEXT_PUBLIC_DEFAULT_USER as string && moment(appointment.date + " " + appointment.time).isAfter(moment(), "minutes"))
        // Create past timeslots where date and time are in the past
        const pastTimeSlots = appointments.filter((appointment) => moment(appointment.date + " " + appointment.time).isBefore(moment(), "minutes") && appointment.pet_id !== (process.env.NEXT_PUBLIC_DEFAULT_PET as string) && appointment.user_id !== process.env.NEXT_PUBLIC_DEFAULT_USER as string)
        // Create upcoming timeslots where date and time are in the future
        const upcomingTimeSlots = appointments.filter((appointment) => moment(appointment.date + " " + appointment.time).isAfter(moment(), "minutes") && appointment.pet_id !== (process.env.NEXT_PUBLIC_DEFAULT_PET as string) && appointment.user_id !== process.env.NEXT_PUBLIC_DEFAULT_USER as string)

        setClosedAppointments(closedTimeSlots)
        setPastAppointments(pastTimeSlots)
        setUpcomingAppointments(upcomingTimeSlots)
    }, [appointments])


    if (isFetching) return <LoadingSpinner />

    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">
        <div className="flex items-center justify-between">
            <span className="text-[1.5rem] font-medium">Rendez-vous</span>
            <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-lg bg-black text-white">Bloquer créaneau</button>
        </div>


        <If condition={appointments.length === 0} >
            <Then>
                <div className="w-full h-full flex flex-col items-center justify-center">

                    <Lottie
                        options={lottieConfig(noAppointments)}
                        height={300}
                        width={300}
                    />
                    <span className="font-medium">Vous n&apos;y a pas de rendez-vous</span>
                    <button disabled={isFetching} onClick={loadAppointments} className={`  p-2 bg-black rounded-lg text-white ${isFetching && "bg-gray-400 cursor-not-allowed"}`}>{isFetching ? "Loading..." : "Actualiser"}</button>
                </div>
            </Then>
            <Else>
                <div className="w-full h-full mt-4 bg-white overflow-scroll rounded-lg shadow-lg p-4">

                    <If condition={closedAppointments.length > 0}>
                        <Then>
                            <div className="w-full mb-4 flex flex-col">
                                {/* <span className="text-base text-gray-900 dark:text-white">Crénaux bloqués</span> */}
                                <span className="text-blue-600 dark:text-blue-900" style={{fontWeight:"700"}}>Crénaux bloqués</span>
                                <div className="w-full h-full flex flex-col mt-4">
                                    {
                                        closedAppointments.map((appointment) => {

                                            return <div key={appointment.id} className="w-full h-[5rem] p-2 flex items-center justify-between mt-4 bg-gray-100 rounded-lg ">
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-base text-gray-900 dark:text-white">{parseDate(appointment.date)}</span>
                                                    <span className="text-base text-gray-900 dark:text-white">{appointment.time}</span>
                                                </div>
                                                <button onClick={async () => {
                                                    await handleOpenTimeslot(appointment.date, appointment.time)
                                                }} className="font-medium p-2 rounded-lg bg-green-500 text-white">
                                                    Débloquer créneau
                                                </button>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </Then>
                        <Else>
                            <div className="flex flex-col">
                            <span className="text-blue-600 dark:text-blue-900" style={{fontWeight:"700"}}>Crénaux bloqués</span>
                                {/* <span className="text-base text-gray-900 dark:text-white">Crénaux bloqués</span> */}
                                <span >Aucun créaneau bloqué</span>
                            </div>
                        </Else>
                    </If>

                    <If condition={upcomingAppointments.length > 0}>
                        <Then>
                            <div className="w-full  mb-4 flex flex-col">
                                <span className="text-blue-600 dark:text-blue-900" style={{fontWeight:"700"}}>Prochains rendez-vous</span>
                                <div className="w-full h-full flex flex-col mt-4">


                                    {
                                        upcomingAppointments.map((appointment) => {

                                            return <div key={appointment.id} className="w-full min-h-[5rem] p-2 flex items-center justify-between mt-4 bg-gray-100 rounded-lg flex-wrap">
        
                                                <div className="flex gap-x-2 items-center contents">
                                                    <div className="flex flex-col justify-center">
                                                        <span className="text-base text-gray-900 dark:text-white">{parseDate(appointment.date)}</span>
                                                        <span className="text-base text-gray-900 dark:text-white">{appointment.time}</span>
                                                    </div>

                                                    <div className="flex flex-col" style={{width:"11rem"}}>
                                                        <span className="text-base text-gray-900 dark:text-white" style={{overflowWrap:"anywhere"}} > {appointment.user.first_name}  {appointment.user.last_name}</span>
                                                    </div>
                                                    <div className="flex flex-col" style={{width:"11rem"}}>
                                                        <span className="text-sm text-gray-900 dark:text-white" style={{width:"11rem" ,overflowWrap:"anywhere"}}>{appointment.pet?.name}, {appointment.pet?.species}, {appointment.pet?.breed}, {appointment.pet?.crossbreed ? "Croisé(e)" : "Pure race"} </span>
                                                     
                                                        {/* <span className="text-sm text-gray-900 dark:text-white" style={{width:"11rem" ,overflowWrap:"anywhere"}}>{appointment.pet?.crossbreed ? "Croisé(e)" : "Pure race"}</span> */}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-x-2">
                                                    <button onClick={async () => {
                                                        setSelectedAppointment(appointment)
                                                        setIsUpdateModalOpen(true)
                                                    }} className="font-medium p-2 rounded-lg border-2 text-sm border-white " style={{background:"#8effa1"}}>
                                                       Editer
                                                    </button>

                                                    {
                                                        isDialogOpen && <AreYouSurePopUp setIsModalOpen={setIsDialogOpen} onSubmit={async () => {
                                                           await handleCancelAppointment(appointment.id)
                                                        }} />
                                                    }

                                                    <button onClick={async () => {
                                                        setIsDialogOpen(true)

                                                    }} className="font-medium p-2 rounded-lg bg-black text-sm text-white " style={{background:"#e70f0f"}}>
                                                       supprimer
                                                    </button>
                                                </div>
                                                {
                                                    isUpdateModalOpen && <UpdateAppointmentModal loadAppintments={loadAppointments} setIsModalOpen={setIsUpdateModalOpen} appointment={appointment} />
                                                }

                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </Then>
                        <Else>
                            <div className="flex mb-4 flex-col">
                            <span className="text-blue-600 dark:text-blue-900" style={{fontWeight:"700"}}>Prochains rendez-vous</span>
                                {/* <span className="text-base text-gray-900 dark:text-white">Upcoming Appointments</span> */}
                                <span>Pas de rendez-vous</span>
                            </div>
                        </Else>
                    </If>

                    <If condition={pastAppointments.length > 0}>
                        <Then>
                            <div className="w-full mb-4 flex flex-col">
                                <span className="text-blue-600 dark:text-blue-900" style={{fontWeight:"700"}}>Rendez-vous passés</span>
                                <div className="w-full h-full flex flex-col mt-4">
                                    {
                                        pastAppointments.map((appointment) => {

                                            console.log(appointment)

                                            return <div key={appointment.id} className="w-full min-h-[5rem] p-2 flex items-center justify-between mt-4 bg-gray-100 rounded-lg flex-wrap">
                                                {
                                                    isNewAppointmentModalOpen && <NewAppointmentModal loadAppintments={loadAppointments} setIsModalOpen={setIsNewAppointmentModalOpen} appointment={appointment} />
                                                }

                                                {
                                                    isMedicalReportModalOpen && <MedicalReportModal loadAppintments={loadAppointments} setIsModalOpen={setIsMedicalReportModalOpen} />
                                                }
                                                <div className="flex gap-x-2 items-center contents" >
                                                    <div className="flex flex-col justify-center" style={{width:"11rem" }}>
                                                        <span className="text-base text-gray-900 dark:text-white" style={{overflowWrap:"anywhere"}}>{parseDate(appointment.date)}</span>
                                                        <span className="text-base text-gray-900 dark:text-white" style={{overflowWrap:"anywhere"}}>{appointment.time}</span>
                                                    </div>

                                                    <div className="flex flex-col" style={{width:"11rem" }}>
                                                        <span style={{overflowWrap:"anywhere"}}> {appointment.user.first_name}  {appointment.user.last_name}</span>
                                                    </div>
                                                    <div className="flex flex-col" style={{width:"11rem" }}>
                                                        <span className="text-sm text-gray-900 dark:text-white" style={{width:"11rem",overflowWrap:"anywhere"}}>{appointment.pet?.name}, {appointment.pet?.species}, {appointment.pet?.breed}</span>
                                                        
                                                        <span className="text-sm text-gray-900 dark:text-white" style={{width:"11rem" ,overflowWrap:"anywhere"}}>{appointment.pet?.crossbreed ? "Crossbred" : "Not crossbred"}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-x-2 flex-wrap">
                                                    <button onClick={async () => {
                                                        setSelectedAppointment(appointment)
                                                        setIsNewAppointmentModalOpen(true)
                                                    }} className="font-medium p-2 rounded-lg border-2 text-sm border-white " style={{background:"#8effa1"}}>
                                                        Plannifier un rendez-vous 
                                                    </button>
                                                    <button onClick={async () => {
                                                        setSelectedAppointment(appointment)
                                                        setIsMedicalReportModalOpen(true)
                                                    }} className="font-medium p-2 rounded-lg bg-black text-sm text-white ">
                                                        {appointment.MedicalReport.length === 0 ? "Ajouter bilan médical" : "Editer bilan médical"}
                                                    </button>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </Then>
                        <Else>
                            <div className="flex flex-col">
                            <span className="text-blue-600 dark:text-blue-900" style={{fontWeight:"700"}}>Rendez-vous passés</span>
                                {/* <span className="text-base text-gray-900 dark:text-white">Past Appointments</span> */}
                                <span>Pas de rendez-vous</span>
                            </div>
                        </Else>
                    </If>
                </div>
            </Else>
        </If>



        {
            isModalOpen && <CloseTimeslotModal loadAppintments={loadAppointments} setIsModalOpen={setIsModalOpen} />
        }



    </div>
}

export default AppointmentsPage;