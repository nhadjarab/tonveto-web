// React import
import { FunctionComponent } from "react"

// Icons import
import { AiOutlineCalendar, AiOutlineHourglass } from "react-icons/ai"
import { BiClinic, BiBriefcase, BiLogOut } from "react-icons/bi"
import { FiSettings } from "react-icons/fi"

type SideBartProps = {
    active: number,
    setActive: (active: number) => void
}

const SideBar: FunctionComponent<SideBartProps> = ({ active, setActive }) => {
    return <div className="w-[18rem] h-screen p-6 flex flex-col items-center justify-between bg-white text-black">
        <span className="font-medium text-[1.5rem]">VetoLib</span>

        <div className="flex flex-col gap-y-4">

            <div onClick={() => setActive(0)} className={`flex w-[14rem] items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200/60 duration-300 transition-all rounded-lg hover:scale-110 ${active === 0 && "bg-gray-200/60 scale-110"} `}>
                <AiOutlineCalendar className="text-[1.5rem]" />
                <span>Appointments</span>
            </div>

            <div onClick={() => setActive(1)} className={`flex w-[14rem] items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200/60 duration-300 transition-all rounded-lg hover:scale-110 ${active === 1 && "bg-gray-200/60 scale-110"}`}>
                <BiClinic className="text-[1.5rem]" />
                <span>Clinics</span>
            </div>

            <div onClick={() => setActive(2)} className={`flex w-[14rem] items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200/60 duration-300 transition-all rounded-lg hover:scale-110 ${active === 2 && "bg-gray-200/60 scale-110"}`}>
                <AiOutlineHourglass className="text-[1.5rem]" />
                <span>Working Hours</span>
            </div>

            <div onClick={() => setActive(3)} className={`flex w-[14rem] items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200/60 duration-300 transition-all rounded-lg hover:scale-110 ${active === 3 && "bg-gray-200/60 scale-110"}`}>
                <BiBriefcase className="text-[1.5rem]" />
                <span>Specialties</span>
            </div>


        </div>

        <div className="flex flex-col gap-y-4">

            <div onClick={() => setActive(4)} className={`flex w-[14rem] items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200/60 duration-300 transition-all rounded-lg hover:scale-110 ${active === 4 && "bg-gray-200/60 scale-110"} `}>
                <FiSettings className="text-[1.5rem]" />
                <span>Settings</span>
            </div>

            <div className={`flex w-[14rem] items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200/60 duration-300 transition-all rounded-lg hover:scale-110 `}>
                <BiLogOut className="text-[1.5rem]" />
                <span>Logout</span>
            </div>




        </div>

    </div>
}

export default SideBar