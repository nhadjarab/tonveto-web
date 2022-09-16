// React import
import { FunctionComponent, useState } from "react";

// Dependency import    
import moment from "moment";
import { toast } from "react-toastify";
import { closeTimeSlot } from "@/api/appointments/appointments";

type Props = {
    setIsModalOpen: (value: boolean) => void
    loadAppintments: () => void
}

const CloseTimeslotModal: FunctionComponent<Props> = ({ setIsModalOpen, loadAppintments }) => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const validateDate = (): boolean => {
        // Check if date and hour are in the past
        const now = moment()
        const selectedDate = moment(date + " " + time)



        if (selectedDate.isBefore(now, "minutes")) {
            return false
        }

        return true
    }



    const handleSubmit = async () => {
        if (!validateDate()) toast.error("You can't close a timeslot in the past")

        try {
            const result = await closeTimeSlot(date, time)

            if (result && result.status === 200) {
                toast.success("Timeslot closed successfully")
                await loadAppintments()
                setIsModalOpen(false)
            }


        } catch (e) {
            console.log(e)
            toast.error(JSON.stringify(e))
        }
    }

    return <div onClick={() => setIsModalOpen(false)} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 " >
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col">
            <span className="font-medium mb-4">Close Timeslot</span>


            <div className="h-full w-full flex flex-col items-center justify-center">
                <div className="flex gap-x-4 items-center">
                    <input onChange={(e) => {
                        setDate(e.target.value)
                    }} type="date" className="bg-white p-2 w-[20rem] border-gray-400 border-[1px] rounded-lg outline-none focus:bourder-2 " />
                    <input
                        onChange={(e) => {
                            setTime(e.target.value)
                        }}
                        type="time" className="bg-white p-2 w-[7rem] border-gray-400 border-[1px] rounded-lg outline-none focus:bourder-2 " />
                </div>


                <button
                    onClick={handleSubmit}
                    disabled={
                        !validateDate() || date === "" || time === ""
                    } className={`mt-10 rounded-lg text-white bg-black p-2 w-full ${!validateDate() || date === "" || time === "" ? "bg-gray-400 cursor-not-allowed" : ""}`}>Submit</button>
            </div>

        </div >

    </div >
}

export default CloseTimeslotModal
