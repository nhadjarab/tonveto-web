import { getVet } from "@/api/profile/proifle";
import { VetState } from "@/types/vet";
import { FunctionComponent , useEffect, useState } from "react";
import ProfileComponent from "./profileComponent";

type Props = {
    vetId: string
    setIsModalOpen: (value: boolean) => void
}

const VetModal: FunctionComponent<Props> = ({ setIsModalOpen, vetId }) => {

    const [vet, setVet] = useState<VetState | null>(null)

    const loadVet = async () => {
        try {
            const result = await getVet(vetId)
            if (result && result?.status === 200) {
                setVet(result?.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            await loadVet()
        })()
    } , [])

    return (
        <div onClick={() => {
            setIsModalOpen(false)
        }} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-30 ">
            <div onClick={(e) => {
                e.stopPropagation()
            }} className="w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col">

                <ProfileComponent user={vet!} />

            </div>
        </div>
    )
}

export default VetModal