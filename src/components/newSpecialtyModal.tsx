// React import
import { FunctionComponent, useState } from "react";

// Icons import
import { AiOutlineClose } from "react-icons/ai"

// Dependcies import
import { toast } from "react-toastify";

// API import
import { createSpecialty } from "@/api/specialty/specialty";

type Props = {
    setIsModalOpen: (value: boolean) => void
    loadSpecialties: () => void
}


const NewSpecialtyModal: FunctionComponent<Props> = ({ setIsModalOpen, loadSpecialties }) => {



    // Local state
    const [specialtyName, setSpecialtyName] = useState("")
    const [specialtyPrice, setSpecialtyPrice] = useState("")
    const [isCreating, setIsCreating] = useState(false)


    const handleCreateSpecialty = async () => {
        try {
            setIsCreating(true)
            const result = await createSpecialty(specialtyName, specialtyPrice)

            console.log()
            if (result!.status === 200) {
                toast.success("Specialty created successfully")
                setIsCreating(false)
                setIsModalOpen(false)
                loadSpecialties()
            }

        } catch (e) {
            console.log(e)
        }
    }

    return <div onClick={(e) => {
        setIsModalOpen(false)
    }} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 ">
        <div onClick={(e) => {
            e.stopPropagation()

        }} className="cursor-default w-[40rem] h-[20rem] rounded-lg bg-white p-6">
            <div className="flex justify-between mb-4">
                <span className="font-medium text-[1.2rem]">New Specialty</span>
                <AiOutlineClose onClick={() => setIsModalOpen(false)} className="text-black cursor-pointer text-[1.5rem]" />
            </div>

            <label>Specialty Name:</label>
            <input onChange={(e) => {
                setSpecialtyName(e.target.value)
            }} className="w-full outline-none border-[1px] bg-white border-black rounded-lg p-2 mb-4" placeholder="Specialty" />

            <label>Price:</label>
            <input onChange={(e) => {
                setSpecialtyPrice(e.target.value)
            }} className="w-full outline-none border-[1px] bg-white border-black rounded-lg p-2 mb-4" placeholder="50€" type="number" />

            <button onClick={handleCreateSpecialty} disabled={specialtyName.length === 0 || specialtyPrice.length === 0 || isCreating} className={`w-full bg-black text-white rounded-lg p-2 ${specialtyName.length === 0 || specialtyPrice.length === 0 || isCreating ? "bg-gray-400 cursor-not-allowed" : ""}`}>{isCreating ? "Loading..." : "Add new specialty"}</button>
        </div>
    </div>
}

export default NewSpecialtyModal;