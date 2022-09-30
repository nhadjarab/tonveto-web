// React import
import { FunctionComponent, useState } from "react";

// Dependcies import
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

// Atoms import
import { selectedSpecialtyAtom } from "@/recoil/atoms";

// Types import
import { Specialty } from "@/types/vet";

// API iport
import { deleteSpecialty } from "@/api/specialty/specialty";
import AreYouSurePopUp from "./areYouSurePopUp";


type Props = {
    specialty: Specialty,
    setIsModalOpen : (value : boolean) => void,
    loadSpecialties: () => void
}




const SpecialtyComponent: FunctionComponent<Props> = ({ specialty, loadSpecialties , setIsModalOpen }) => {
    // Local state
    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Recoil state
    const [_selectedSpecialty, setSelectedSpecialty] = useRecoilState(selectedSpecialtyAtom)


    // Methods
    const handleDeleteSpecialty = async () => {
        try {
            setIsLoading(true)
            const result = await deleteSpecialty(specialty.id)
            if (result!.status === 200) {
                toast.success("Specialty deleted successfully")
                loadSpecialties()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdateSpecialty = async () => {
        try {
            setSelectedSpecialty(specialty)
            setIsModalOpen(true)
        } catch (e) {
            console.log(e)
        }
    }

    return <div className="min-w-[10rem] min-h-[10rem] bg-white rounded-lg shadow-lg flex flex-col p-4 justify-between">
        <div className="flex-col flex">
            <span className="text-[1.2rem] font-medium">{specialty.name}</span>
            <span>€{specialty.price}</span>
        </div>


        <div className="flex w-full gap-x-2">
            <button onClick={handleUpdateSpecialty} disabled={isLoading} className={`p-1 border-2 border-black rounded-lg ${isLoading && "bg-gray-400 cursor-not-allowed"}`}>Editer</button>
            <button onClick={() => {
                setIsDialogOpen(true)
            }} disabled={isLoading} className={`p-1 bg-red-600 text-white rounded-lg ${isLoading && "bg-gray-400 cursor-not-allowed"}`}>Supprimer</button>
        </div>

        {
            isDialogOpen && <AreYouSurePopUp setIsModalOpen={setIsDialogOpen}  onSubmit={handleDeleteSpecialty}/>
        }

    </div>
}

export default SpecialtyComponent