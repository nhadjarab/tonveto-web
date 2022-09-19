// React import
import { FunctionComponent, useEffect, useState } from "react";

// Dependcies import
import { If, Then, Else } from 'react-if'

// Recoil import
import { useRecoilState } from "recoil";

// Atom import
import { selectedClinicAtom } from "@/recoil/atoms";
import { getClinic, removeVetFromClinic } from "@/api/clinic/clinic";
import { VetProfile } from "@/types/vet";
import { toast } from "react-toastify";


type Props = {
    setIsModalOpen: (value: boolean) => void
}


const VetsModal: FunctionComponent<Props> = ({ setIsModalOpen }) => {

    // Local State
    const [clinic, setClinic] = useState<any>(null)
    // Recoil State
    const [selectedClinic, setSelectedClinic] = useRecoilState(selectedClinicAtom)


    useEffect(() => {
        (async () => {
            try {

                const result = await getClinic(selectedClinic!)

                if (result) {
                    setClinic(result.data)
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])


    const handleRemoveVet = async (vetId: string) => {
        try {

            const result = await removeVetFromClinic(vetId, selectedClinic!)
            if (result && result.status === 200) {
                toast.success("Vet removed from clinic")
                setIsModalOpen(false)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return <div onClick={() => {
        setSelectedClinic(null)
        setIsModalOpen(false)
    }} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 ">
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col">

            <span className="text-lg font-medium">Vets List</span>

            <If condition={clinic !== null}>
                <Then>
                    {

                        clinic?.clinic.vets.map((vetRelation: any) => {
                            const vet: VetProfile = vetRelation.vet
                            const vetId = localStorage.getItem('user_id')
                            return <div key={vet.id} className="w-full flex items-center justify-between p-2 border-b border-gray-200">

                                <div onClick={() => {
                                }} className="flex flex-col">
                                    <span className="text-lg font-medium">{vet.first_name}  {vet.last_name}</span>
                                    <span className="text-sm">{vet.email}</span>
                                    <span className="text-sm">Identification Number : {vet.identification_order}</span>
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <If condition={vetId !== vet.id}>
                                        <Then>
                                            <button
                                                onClick={async () => {
                                                    handleRemoveVet(vet.id!)
                                                }}
                                                className="p-2 rounded-lg bg-red-500 text-white">Remove vet</button>
                                        </Then>


                                    </If>

                                </div>



                            </div>
                        })
                    }
                </Then>
                <Else>
                    {null}

                </Else>
            </If>



        </div></div>
}

export default VetsModal