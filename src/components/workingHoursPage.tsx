// React import
import { FunctionComponent, useEffect, useState, useRef } from "react";

// API import
import { getProfile } from "@/api/profile/proifle";

//Dependcies import
import { useAutoAnimate } from '@formkit/auto-animate/react'

import LoadingSpinner from "./loadingSpinner";
import CustomSwitch from "./customSwitch";
import moment from "moment";
import { toast } from "react-toastify";
import { createCalendar, updateCalendar } from "@/api/calendar/calendar";
import { Calendar } from "@/types/vet";



const WorkingHoursPage: FunctionComponent = () => {

    // Local state
    const [workingHours, setWorkingHours] = useState<Calendar[]>([])
    const [isFetching, setIsFetching] = useState(false)
    const [isMonday, setIsMonday] = useState(false)
    const [isTuesday, setIsTuesday] = useState(false)
    const [isWednesday, setIsWednesday] = useState(false)
    const [isThursday, setIsThursday] = useState(false)
    const [isFriday, setIsFriday] = useState(false)
    const [isSaturday, setIsSaturday] = useState(false)
    const [isSunday, setIsSunday] = useState(false)

    // Monday
    const [mondayMorningStart, setMondayMorningStart] = useState("")
    const [mondayMorningEnd, setMondayMorningEnd] = useState("")
    const [mondayAfternoonStart, setMondayAfternoonStart] = useState("")
    const [mondayAfternoonEnd, setMondayAfternoonEnd] = useState("")

    // Tuesday
    const [tuesdayMorningStart, setTuesdayMorningStart] = useState("")
    const [tuesdayMorningEnd, setTuesdayMorningEnd] = useState("")
    const [tuesdayAfternoonStart, setTuesdayAfternoonStart] = useState("")
    const [tuesdayAfternoonEnd, setTuesdayAfternoonEnd] = useState("")

    // Wednesday
    const [wednesdayMorningStart, setWednesdayMorningStart] = useState("")
    const [wednesdayMorningEnd, setWednesdayMorningEnd] = useState("")
    const [wednesdayAfternoonStart, setWednesdayAfternoonStart] = useState("")
    const [wednesdayAfternoonEnd, setWednesdayAfternoonEnd] = useState("")

    // Thursday
    const [thursdayMorningStart, setThursdayMorningStart] = useState("")
    const [thursdayMorningEnd, setThursdayMorningEnd] = useState("")
    const [thursdayAfternoonStart, setThursdayAfternoonStart] = useState("")
    const [thursdayAfternoonEnd, setThursdayAfternoonEnd] = useState("")

    // Friday
    const [fridayMorningStart, setFridayMorningStart] = useState("")
    const [fridayMorningEnd, setFridayMorningEnd] = useState("")
    const [fridayAfternoonStart, setFridayAfternoonStart] = useState("")
    const [fridayAfternoonEnd, setFridayAfternoonEnd] = useState("")

    // Saturday
    const [saturdayMorningStart, setSSaturdayMorningStart] = useState("")
    const [saturdayMorningEnd, setSaturdayMorningEnd] = useState("")
    const [saturdayAfternoonStart, setSaturdayAfternoonStart] = useState("")
    const [saturdayAfternoonEnd, setSaturdayAfternoonEnd] = useState("")

    // Sunday
    const [sundayMorningStart, setSundayMorningStart] = useState("")
    const [sundayMorningEnd, setSundayMorningEnd] = useState("")
    const [sundayAfternoonStart, setSundayAfternoonStart] = useState("")
    const [sundayAfternoonEnd, setSundayAfternoonEnd] = useState("")


    // Ref 
    const parent = useRef(null)

    const loadWorkingHours = async () => {
        try {
            setIsFetching(true)
            const profile = await getProfile()
            setWorkingHours(profile?.vetProfile!.calendar)
            setIsFetching(false)
        } catch (err) {
            setIsFetching(false)
            console.log(err)

        }
    }

    useEffect(() => {

        (async () => {
            await loadWorkingHours()
        })()

    }, [])

    useEffect(() => {
        if (workingHours.length === 0) return
        handleInitialLoad()
    }, [workingHours])



    const [animationParent] = useAutoAnimate<HTMLDivElement>()


    if (isFetching) return <LoadingSpinner />

    const onSubmit = async () => {

        const { isValid, error } = validateWorkingHours()

        if (!isValid) return toast.error(error)

        const workDay = {
            "monday": !isMonday ? "closed" : {
                "morning": {
                    "start_at": mondayMorningStart,
                    "end_at": mondayMorningEnd
                },
                "afternoon": {
                    "start_at": mondayAfternoonStart,
                    "end_at": mondayAfternoonEnd
                }
            },
            "tuesday": !isTuesday ? "closed" : {
                "morning": {
                    "start_at": tuesdayMorningStart,
                    "end_at": tuesdayMorningEnd
                },
                "afternoon": {
                    "start_at": tuesdayAfternoonStart,
                    "end_at": tuesdayAfternoonEnd
                }
            },
            "wednesday": !isWednesday ? "closed" : {
                "morning": {
                    "start_at": wednesdayMorningStart,
                    "end_at": wednesdayMorningEnd
                },
                "afternoon": {
                    "start_at": wednesdayAfternoonStart,
                    "end_at": wednesdayAfternoonEnd
                }
            },
            "thursday": !isThursday ? "closed" : {
                "morning": {
                    "start_at": thursdayMorningStart,
                    "end_at": thursdayMorningEnd
                },
                "afternoon": {
                    "start_at": thursdayAfternoonStart,
                    "end_at": thursdayAfternoonEnd
                }
            },
            "friday": !isFriday ? "closed" : {
                "morning": {
                    "start_at": fridayMorningStart,
                    "end_at": fridayMorningEnd
                },
                "afternoon": {
                    "start_at": fridayAfternoonStart,
                    "end_at": fridayAfternoonEnd
                }
            },
            "saturday": !isSaturday ? "closed" : {
                "morning": {
                    "start_at": saturdayMorningStart,
                    "end_at": saturdayMorningEnd
                },
                "afternoon": {
                    "start_at": saturdayAfternoonStart,
                    "end_at": saturdayAfternoonEnd
                }
            },
            "sunday": !isSunday ? "closed" : {
                "morning": {
                    "start_at": sundayMorningStart,
                    "end_at": sundayMorningEnd
                },
                "afternoon": {
                    "start_at": sundayAfternoonStart,
                    "end_at": sundayAfternoonEnd
                }
            },
            "owner_id": localStorage.getItem("user_id")
        }



        try {
            const result = workingHours.length === 0 ? await createCalendar(workDay) : await updateCalendar(workDay, workingHours[0].id)

            if (result?.status === 200) {
                toast.success(workingHours.length === 0 ? "Working hours created" : "Working hours updated")
                await loadWorkingHours()
            }
        } catch (e) {
            console.log(e)
        }
    }

    function padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
    }


    function formatDate(date: any) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }


    const validateWorkingHours = () => {
        if (!isMonday && !isTuesday && !isWednesday && !isThursday && !isFriday && !isSaturday && !isSunday) return { isValid: true, error: "" }
        if (isMonday && (mondayMorningStart === "" || mondayMorningEnd === "" || mondayAfternoonStart === "" || mondayAfternoonEnd === "") ||
            isTuesday && (tuesdayMorningStart === "" || tuesdayMorningEnd === "" || tuesdayAfternoonStart === "" || tuesdayAfternoonEnd === "") ||
            isWednesday && (wednesdayMorningStart === "" || wednesdayMorningEnd === "" || wednesdayAfternoonStart === "" || wednesdayAfternoonEnd === "") ||
            isThursday && (thursdayMorningStart === "" || thursdayMorningEnd === "" || thursdayAfternoonStart === "" || thursdayAfternoonEnd === "") ||
            isFriday && (fridayMorningStart === "" || fridayMorningEnd === "" || fridayAfternoonStart === "" || fridayAfternoonEnd === "") ||
            isSaturday && (saturdayMorningStart === "" || saturdayMorningEnd === "" || saturdayAfternoonStart === "" || saturdayAfternoonEnd === "") ||
            isSunday && (sundayMorningStart === "" || sundayMorningEnd === "" || sundayAfternoonStart === "" || sundayAfternoonEnd === "")
        ) return { isValid: false, error: "Please fill in the working hours correctly" }


        const date = formatDate(new Date())


        if ((isMonday && (moment(`${date} ${mondayMorningStart}`).isSame(`${date} ${mondayMorningEnd}`) || moment(`${date} ${mondayAfternoonStart}`).isSame(`${date} ${mondayAfternoonEnd}`))) ||
            (isTuesday && (moment(`${date} ${tuesdayMorningStart}`).isSame(`${date} ${tuesdayMorningEnd}`) || moment(`${date} ${tuesdayAfternoonStart}`).isSame(`${date} ${tuesdayAfternoonEnd}`))) ||
            (isWednesday && (moment(`${date} ${wednesdayMorningStart}`).isSame(`${date} ${wednesdayMorningEnd}`) || moment(`${date} ${wednesdayAfternoonStart}`).isSame(`${date} ${wednesdayAfternoonEnd}`))) ||
            (isThursday && (moment(`${date} ${thursdayMorningStart}`).isSame(`${date} ${thursdayMorningEnd}`) || moment(`${date} ${thursdayAfternoonStart}`).isSame(`${date} ${thursdayAfternoonEnd}`))) ||
            (isFriday && (moment(`${date} ${fridayMorningStart}`).isSame(`${date} ${fridayMorningEnd}`) || moment(`${date} ${fridayAfternoonStart}`).isSame(`${date} ${fridayAfternoonEnd}`))) ||
            (isSaturday && (moment(`${date} ${saturdayMorningStart}`).isSame(`${date} ${saturdayMorningEnd}`) || moment(`${date} ${saturdayAfternoonStart}`).isSame(`${date} ${saturdayAfternoonEnd}`))) ||
            (isSunday && (moment(`${date} ${sundayMorningStart}`).isSame(`${date} ${sundayMorningEnd}`) || moment(`${date} ${sundayAfternoonStart}`).isSame(`${date} ${sundayAfternoonEnd}`)))
        ) {
            return { isValid: false, error: "Opening and closing hours cannot be the same" }
        }


        if (!((isMonday && (moment(`${date} ${mondayMorningStart}`).isBefore(`${date} ${mondayMorningEnd}`) && moment(`${date} ${mondayAfternoonStart}`).isBefore(`${date} ${mondayAfternoonEnd}`) && moment(`${date} ${mondayMorningStart}`).isBefore(`${date} ${mondayAfternoonStart}`) && moment(`${date} ${mondayMorningEnd}`).isBefore(`${date} ${mondayAfternoonEnd}`) &&
            moment(`${date} ${mondayMorningEnd}`).isBefore(`${date} ${mondayAfternoonStart}`) && moment(`${date} ${mondayMorningStart}`).isBefore(`${date} ${mondayAfternoonEnd}`))) ||
            (isTuesday && (moment(`${date} ${tuesdayMorningStart}`).isBefore(`${date} ${tuesdayMorningEnd}`) && moment(`${date} ${tuesdayAfternoonStart}`).isBefore(`${date} ${tuesdayAfternoonEnd}`) && moment(`${date} ${tuesdayMorningStart}`).isBefore(`${date} ${tuesdayAfternoonStart}`) && moment(`${date} ${tuesdayMorningEnd}`).isBefore(`${date} ${tuesdayAfternoonEnd}`) &&
                moment(`${date} ${tuesdayMorningEnd}`).isBefore(`${date} ${tuesdayAfternoonStart}`) && moment(`${date} ${tuesdayMorningStart}`).isBefore(`${date} ${tuesdayAfternoonEnd}`))) ||
            (isWednesday && (moment(`${date} ${wednesdayMorningStart}`).isBefore(`${date} ${wednesdayMorningEnd}`) && moment(`${date} ${wednesdayAfternoonStart}`).isBefore(`${date} ${wednesdayAfternoonEnd}`) && moment(`${date} ${wednesdayMorningStart}`).isBefore(`${date} ${wednesdayAfternoonStart}`) && moment(`${date} ${wednesdayMorningEnd}`).isBefore(`${date} ${wednesdayAfternoonEnd}`) &&
                moment(`${date} ${wednesdayMorningEnd}`).isBefore(`${date} ${wednesdayAfternoonStart}`) && moment(`${date} ${wednesdayMorningStart}`).isBefore(`${date} ${wednesdayAfternoonEnd}`))) ||
            (isThursday && (moment(`${date} ${thursdayMorningStart}`).isBefore(`${date} ${thursdayMorningEnd}`) && moment(`${date} ${thursdayAfternoonStart}`).isBefore(`${date} ${thursdayAfternoonEnd}`) && moment(`${date} ${thursdayMorningStart}`).isBefore(`${date} ${thursdayAfternoonStart}`) && moment(`${date} ${thursdayMorningEnd}`).isBefore(`${date} ${thursdayAfternoonEnd}`) &&
                moment(`${date} ${thursdayMorningEnd}`).isBefore(`${date} ${thursdayAfternoonStart}`) && moment(`${date} ${thursdayMorningStart}`).isBefore(`${date} ${thursdayAfternoonEnd}`))) ||
            (isFriday && (moment(`${date} ${fridayMorningStart}`).isBefore(`${date} ${fridayMorningEnd}`) && moment(`${date} ${fridayAfternoonStart}`).isBefore(`${date} ${fridayAfternoonEnd}`) && moment(`${date} ${fridayMorningStart}`).isBefore(`${date} ${fridayAfternoonStart}`) && moment(`${date} ${fridayMorningEnd}`).isBefore(`${date} ${fridayAfternoonEnd}`) &&
                moment(`${date} ${fridayMorningEnd}`).isBefore(`${date} ${fridayAfternoonStart}`) && moment(`${date} ${fridayMorningStart}`).isBefore(`${date} ${fridayAfternoonEnd}`))) ||
            (isSaturday && (moment(`${date} ${saturdayMorningStart}`).isBefore(`${date} ${saturdayMorningEnd}`) && moment(`${date} ${saturdayAfternoonStart}`).isBefore(`${date} ${saturdayAfternoonEnd}`) && moment(`${date} ${saturdayMorningStart}`).isBefore(`${date} ${saturdayAfternoonStart}`) && moment(`${date} ${saturdayMorningEnd}`).isBefore(`${date} ${saturdayAfternoonEnd}`) &&
                moment(`${date} ${saturdayMorningEnd}`).isBefore(`${date} ${saturdayAfternoonStart}`) && moment(`${date} ${saturdayMorningStart}`).isBefore(`${date} ${saturdayAfternoonEnd}`))) ||
            (isSunday && (moment(`${date} ${sundayMorningStart}`).isBefore(`${date} ${sundayMorningEnd}`) && moment(`${date} ${sundayAfternoonStart}`).isBefore(`${date} ${sundayAfternoonEnd}`) && moment(`${date} ${sundayMorningStart}`).isBefore(`${date} ${sundayAfternoonStart}`) && moment(`${date} ${sundayMorningEnd}`).isBefore(`${date} ${sundayAfternoonEnd}`) &&
                moment(`${date} ${sundayMorningEnd}`).isBefore(`${date} ${sundayAfternoonStart}`) && moment(`${date} ${sundayMorningStart}`).isBefore(`${date} ${sundayAfternoonEnd}`))))) return { isValid: false, error: "Closing hours cannot be before opening hours" }

        return { isValid: true, error: "" }

    }

    const handleInitialLoad = () => {
        if (workingHours.length === 0) {
            setIsMonday(false)
            setIsTuesday(false)
            setIsWednesday(false)
            setIsThursday(false)
            setIsFriday(false)
            setIsSaturday(false)
            setIsSunday(false)
            return
        }



        const keys = Object.keys(workingHours[0]).filter((key) => key !== "id" && key !== "owner_id")
        const jsonCalendar = workingHours[0]

        const calendar = {

        }



        keys.forEach((key: string) => {
            calendar[key] = JSON.parse(jsonCalendar[key] as any)
        })



        if (calendar.monday !== "closed") {
            setIsMonday(true)
            setMondayMorningStart(calendar.monday.morning.start_at)
            setMondayMorningEnd(calendar.monday.morning.end_at)
            setMondayAfternoonStart(calendar.monday.afternoon.start_at)
            setMondayAfternoonEnd(calendar.monday.afternoon.end_at)
        }

        if (calendar.tuesday !== "closed") {
            setIsTuesday(true)
            setTuesdayMorningStart(calendar.tuesday.morning.start_at)
            setTuesdayMorningEnd(calendar.tuesday.morning.end_at)
            setTuesdayAfternoonStart(calendar.tuesday.afternoon.start_at)
            setTuesdayAfternoonEnd(calendar.tuesday.afternoon.end_at)
        }

        if (calendar.wednesday !== "closed") {
            setIsWednesday(true)
            setWednesdayMorningStart(calendar.wednesday.morning.start_at)
            setWednesdayMorningEnd(calendar.wednesday.morning.end_at)
            setWednesdayAfternoonStart(calendar.wednesday.afternoon.start_at)
            setWednesdayAfternoonEnd(calendar.wednesday.afternoon.end_at)
        }

        if (calendar.thursday !== "closed") {
            setIsThursday(true)
            setThursdayMorningStart(calendar.thursday.morning.start_at)
            setThursdayMorningEnd(calendar.thursday.morning.end_at)
            setThursdayAfternoonStart(calendar.thursday.afternoon.start_at)
            setThursdayAfternoonEnd(calendar.thursday.afternoon.end_at)
        }

        if (calendar.friday !== "closed") {
            setIsFriday(true)
            setFridayMorningStart(calendar.friday.morning.start_at)
            setFridayMorningEnd(calendar.friday.morning.end_at)
            setFridayAfternoonStart(calendar.friday.afternoon.start_at)
            setFridayAfternoonEnd(calendar.friday.afternoon.end_at)
        }

        if (calendar.saturday !== "closed") {
            setIsSaturday(true)
            setSSaturdayMorningStart(calendar.saturday.morning.start_at)
            setSaturdayMorningEnd(calendar.saturday.morning.end_at)
            setSaturdayAfternoonStart(calendar.saturday.afternoon.start_at)
            setSaturdayAfternoonEnd(calendar.saturday.afternoon.end_at)
        }

        if (calendar.sunday !== "closed") {
            setIsSunday(true)
            setSundayMorningStart(calendar.sunday.morning.start_at)
            setSundayMorningEnd(calendar.sunday.morning.end_at)
            setSundayAfternoonStart(calendar.sunday.afternoon.start_at)
            setSundayAfternoonEnd(calendar.sunday.afternoon.end_at)
        }

    }

    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">
        <span className="text-[1.5rem] font-medium mb-4">Working Hours</span>

        <div ref={animationParent} className="w-full h-full overflow-scroll bg-white rounded-lg flex flex-col gap-y-4 shadow-lg p-4">
            <span className=" font-medium">Set Standard Hours</span>
            <div className="mb-16" />

            {/* Monday */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Monday:</span>
                    <CustomSwitch checked={isMonday} onChange={setIsMonday} />
                </div>

                {
                    isMonday &&
                    <div className="flex justify-between mt-2 px-14">

                        <div className="flex items-center gap-x-2">
                            <span>Morning:</span>
                            <input defaultValue={
                                mondayMorningStart
                            } onChange={(e) => {
                                setMondayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                            <span>to</span>
                            <input
                                defaultValue={
                                    mondayMorningEnd
                                }
                                onChange={(e) => {
                                    setMondayMorningEnd(e.target.value)
                                }}
                                className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        </div>

                        <div className="flex items-center gap-x-2">
                            <span>Afternoon:</span>
                            <input
                                defaultValue={
                                    mondayAfternoonStart
                                }
                                onChange={(e) => {
                                    setMondayAfternoonStart(e.target.value)
                                }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                            <span>to</span>
                            <input
                                defaultValue={
                                    mondayAfternoonEnd
                                }
                                onChange={(e) => {
                                    setMondayAfternoonEnd(e.target.value)
                                }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        </div>
                    </div>}

            </div>

            {/* Tuesday */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Tuesday:</span>
                    <CustomSwitch checked={isTuesday} onChange={setIsTuesday} />
                </div>

                {isTuesday && <div className="flex justify-between mt-2 px-14">

                    <div className="flex items-center gap-x-2">
                        <span>Morning:</span>
                        <input
                            defaultValue={
                                tuesdayMorningStart
                            }
                            onChange={(e) => {
                                setTuesdayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                tuesdayMorningEnd
                            }
                            onChange={(e) => {
                                setTuesdayMorningEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span>Afternoon:</span>
                        <input
                            defaultValue={
                                tuesdayAfternoonStart
                            }
                            onChange={(e) => {
                                setTuesdayAfternoonStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                tuesdayAfternoonEnd
                            }
                            onChange={(e) => {
                                setTuesdayAfternoonEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>
                </div>}

            </div>


            {/* Wednesday */}
            <div
                className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Wednesday:</span>
                    <CustomSwitch checked={isWednesday} onChange={setIsWednesday} />
                </div>

                {isWednesday && <div className="flex justify-between mt-2 px-14">

                    <div className="flex items-center gap-x-2">
                        <span>Morning:</span>
                        <input
                            defaultValue={
                                wednesdayMorningStart
                            }
                            onChange={(e) => {
                                setWednesdayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                wednesdayMorningEnd
                            }
                            onChange={(e) => {
                                setWednesdayMorningEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span>Afternoon:</span>
                        <input
                            defaultValue={
                                wednesdayAfternoonStart
                            }
                            onChange={(e) => {
                                setWednesdayAfternoonStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input

                            defaultValue={
                                wednesdayAfternoonEnd
                            }
                            onChange={(e) => {
                                setWednesdayAfternoonEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>
                </div>}

            </div>

            {/* Thursday */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Thursday:</span>
                    <CustomSwitch checked={isThursday} onChange={setIsThursday} />
                </div>

                {isThursday && <div className="flex justify-between mt-2 px-14">

                    <div className="flex items-center gap-x-2">
                        <span>Morning:</span>
                        <input
                            defaultValue={
                                thursdayMorningStart
                            }
                            onChange={(e) => {
                                setThursdayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                thursdayMorningEnd
                            }
                            onChange={(e) => {
                                setThursdayMorningEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span>Afternoon:</span>
                        <input
                            defaultValue={
                                thursdayAfternoonStart
                            }
                            onChange={(e) => {
                                setThursdayAfternoonStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                thursdayAfternoonEnd
                            }
                            onChange={(e) => {
                                setThursdayAfternoonEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>
                </div>}

            </div>

            {/* Friday */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Friday:</span>
                    <CustomSwitch checked={isFriday} onChange={setIsFriday} />
                </div>

                {isFriday && <div className="flex justify-between mt-2 px-14">

                    <div className="flex items-center gap-x-2">
                        <span>Morning:</span>
                        <input
                            defaultValue={
                                fridayMorningStart
                            }
                            onChange={(e) => {
                                setFridayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                fridayMorningEnd
                            }
                            onChange={(e) => {
                                setFridayMorningEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span>Afternoon:</span>
                        <input onChange={(e) => {
                            setFridayAfternoonStart(e.target.value)
                        }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input onChange={(e) => {
                            setFridayAfternoonEnd(e.target.value)
                        }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>
                </div>}

            </div>

            {/* Saturday */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Saturday:</span>
                    <CustomSwitch checked={isSaturday} onChange={setIsSaturday} />
                </div>

                {isSaturday && <div className="flex justify-between mt-2 px-14">

                    <div className="flex items-center gap-x-2">
                        <span>Morning:</span>
                        <input
                            defaultValue={
                                saturdayMorningStart
                            }
                            onChange={(e) => {
                                setSSaturdayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                saturdayMorningEnd
                            }
                            onChange={(e) => {
                                setSaturdayMorningEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span>Afternoon:</span>
                        <input
                            defaultValue={
                                saturdayAfternoonStart
                            }
                            onChange={(e) => {
                                setSaturdayAfternoonStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                saturdayAfternoonEnd
                            }
                            onChange={(e) => {
                                setSaturdayAfternoonEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>
                </div>}

            </div>

            {/* Sunday */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span>Sunday:</span>
                    <CustomSwitch checked={isSunday} onChange={setIsSunday} />
                </div>

                {isSunday && <div className="flex justify-between mt-2 px-14">

                    <div className="flex items-center gap-x-2">
                        <span>Morning:</span>
                        <input
                            defaultValue={
                                sundayMorningStart
                            }
                            onChange={(e) => {
                                setSundayMorningStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                sundayMorningEnd
                            }
                            onChange={(e) => {
                                setSundayMorningEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span>Afternoon:</span>
                        <input
                            defaultValue={
                                sundayAfternoonStart
                            }
                            onChange={(e) => {
                                setSundayAfternoonStart(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                        <span>to</span>
                        <input
                            defaultValue={
                                sundayAfternoonEnd
                            }
                            onChange={(e) => {
                                setSundayAfternoonEnd(e.target.value)
                            }} className="bg-white w-[5rem] outline-none rounded-lg border-2 border-gray-400 " type="time" />
                    </div>
                </div>}

            </div>


            <button onClick={onSubmit} className="bg-black p-2 rounded-lg self-center text-white" >Submit</button>
        </div>

    </div>
}

export default WorkingHoursPage;