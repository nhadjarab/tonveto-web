// React import
import { FunctionComponent, useState } from "react";

// Icons import
import { AiOutlineClose } from "react-icons/ai"

// Dependcies import
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

// Atom import
import { selectedSpecialtyAtom , } from "@/recoil/atoms";

// API import
import { createSpecialty, updateSpecialty } from "@/api/specialty/specialty";

type Props = {
    setIsModalOpen: (value: boolean) => void
    loadSpecialties: () => void
}


const NewSpecialtyModal: FunctionComponent<Props> = ({ setIsModalOpen, loadSpecialties }) => {

    // Recoil state
    const [selectedSpecialty , setSelectedSpecialty] = useRecoilState(selectedSpecialtyAtom)

    // Local state
    const [specialtyName, setSpecialtyName] = useState(selectedSpecialty ? selectedSpecialty.name : "")
    const [specialtyPrice, setSpecialtyPrice] = useState(selectedSpecialty ? selectedSpecialty.price.toString() : "")
    const [isCreating, setIsCreating] = useState(false)





    const handleCreateSpecialty = async () => {
        try {
            setIsCreating(true)

            let result;
            if (selectedSpecialty) {
                result = await updateSpecialty(specialtyName, specialtyPrice, selectedSpecialty.id)
            } else {
                result = await createSpecialty(specialtyName, specialtyPrice)
            }


            if (result!.status === 200) {
                toast.success(selectedSpecialty ? "Specialty updated successfully" : "Specialty created successfully")
                setSelectedSpecialty(null)
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
                <span className="font-medium text-[1.2rem]">{selectedSpecialty ? "Editer sp??cialit??" : "Nouvelle sp??cialit??"}</span>
                <AiOutlineClose onClick={() => setIsModalOpen(false)} className="text-black cursor-pointer text-[1.5rem]" />
            </div>

            <label>Sp??cialit??:</label>
            <input defaultValue={selectedSpecialty ? selectedSpecialty.name : ""} onChange={(e) => {
                setSpecialtyName(e.target.value)
            }} className="w-full outline-none border-[1px] bg-white border-black rounded-lg p-2 mb-4" placeholder="Specialty" />

            <label>Prix:</label>
            <input defaultValue={selectedSpecialty ? selectedSpecialty.price : ""}
            onInput={(e) => {
                e.target.value = Math.abs(parseFloat(e.target.value)).toString()
            }}
             onChange={(e) => {
                setSpecialtyPrice(Math.abs(parseFloat(e.target.value)).toString())
            }} className="w-full outline-none border-[1px] bg-white border-black rounded-lg p-2 mb-4" placeholder="50???" type="number" />

            <button onClick={handleCreateSpecialty} disabled={specialtyName.length === 0 || specialtyPrice.length === 0 || isCreating || (specialtyName === selectedSpecialty?.name && specialtyPrice === selectedSpecialty?.price.toString())} className={`w-full bg-black text-white rounded-lg p-2 ${specialtyName.length === 0 || specialtyPrice.length === 0 || isCreating || (specialtyName === selectedSpecialty?.name && specialtyPrice === selectedSpecialty?.price.toString()) ? "bg-gray-400 cursor-not-allowed" : ""}`}>{isCreating ? "Loading..." : selectedSpecialty ? "Ok" : "Ok"}</button>
        </div>
    </div>
}

export default NewSpecialtyModal;