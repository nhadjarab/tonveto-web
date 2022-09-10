// React import
import { deleteSpecialty } from "@/api/specialty/specialty";
import { Specialty } from "@/types/vet";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";


type Props = {
    specialty: Specialty,
    loadSpecialties: () => void
}




const SpecialtyComponent: FunctionComponent<Props> = ({ specialty, loadSpecialties }) => {
    // Local state
    const [isLoading, setIsLoading] = useState(false)


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

    return <div className="w-[10rem] h-[10rem] bg-white rounded-lg shadow-lg flex flex-col p-4 justify-between">
        <div className="flex-col flex">
            <span className="text-[1.2rem] font-medium">{specialty.name}</span>
            <span>€{specialty.price}</span>
        </div>


        <div className="flex w-full gap-x-2">
            <button disabled={isLoading} className={`p-1 border-2 border-black rounded-lg ${isLoading && "bg-gray-400 cursor-not-allowed"}`}>Update</button>
            <button onClick={handleDeleteSpecialty} disabled={isLoading} className={`p-1 bg-red-600 text-white rounded-lg ${isLoading && "bg-gray-400 cursor-not-allowed"}`}>Delete</button>
        </div>

    </div>
}

export default SpecialtyComponent