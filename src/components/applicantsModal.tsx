// React import
import { Tab } from "@headlessui/react";
import { FunctionComponent, useState } from "react";
import CreateClinic from "./createClinic";
import JoinClinic from "./joinClinic";


import {
    useRecoilState,
} from "recoil";

import { selectedClinicAtom } from "@/recoil/atoms"
import { useLayoutEffect } from "react";
import { acceptClinicApplicant, getClinicApplicants, rejectClinicApplicant } from "@/api/clinic/clinic";
import { VetProfile } from "@/types/vet";
import { toast } from "react-toastify";

type Props = {
    setIsModalOpen: (value: boolean) => void
}

const ApplicantsModal: FunctionComponent<Props> = ({ setIsModalOpen }) => {

    // Local State  
    const [applicants, setApplicants] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)

    // Recoil State
    const [selectedClinic, setSelectedClinic] = useRecoilState(selectedClinicAtom)

    console.log(selectedClinic)

    const loadApplicants = async () => {
        try {
            const result = await getClinicApplicants(selectedClinic!)
            if (result!.status === 200) {
                setApplicants(result?.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useLayoutEffect(() => {
        (async () => {
            await loadApplicants()
        })()

    }, [])


    const handleAccept = async (applicantId: string) => {
        try {
            const result = await acceptClinicApplicant(selectedClinic!, applicantId)
            if (result?.status === 200) {
                toast.success("Applicant accepted")
                await loadApplicants()
            }
        } catch (e) {
            console.log(e)
        }
    }


    const handleReject = async (applicantId: string) => {
        try {
            const result = await rejectClinicApplicant(selectedClinic!, applicantId)
            if (result?.status === 200) {
                toast.success("Applicant rejected")
                await loadApplicants()
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
            <span className="font-medium mb-4">Applicant List</span>

            {
                applicants.length === 0 ?
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <span className="text-gray-400">No Applicants</span>
                        <button onClick={async () => {
                            await loadApplicants()
                        }} className="p-2 rounded-lg bg-black text-white">Refresh</button>
                    </div>
                    : <div className="w-full h-full flex flex-col">
                        <div className="w-full h-full overflow-y-auto">
                            {
                                applicants.map((applicant: any) => {

                                    const vet: VetProfile = applicant.vet
                                    return <div key={vet.id} className="w-full flex items-center justify-between p-2 border-b border-gray-200">

                                        <div className="flex flex-col">
                                            <span className="text-lg font-medium">{vet.first_name}  {vet.last_name}</span>
                                            <span className="text-sm">{vet.email}</span>
                                            <span className="text-sm">Identification Number : {vet.identification_order}</span>
                                        </div>

                                        <div className="flex items-center gap-x-2">
                                            <button onClick={async () => {
                                                await handleAccept(vet.id!)
                                            }} className="p-2 rounded-lg bg-green-500 text-white">Accept</button>
                                            <button
                                                onClick={async () => {
                                                    await handleReject(vet.id!)
                                                }}
                                                className="p-2 rounded-lg bg-red-500 text-white">Reject</button>
                                        </div>
                                    </div>
                                })
                            }


                        </div>
                    </div>
            }

        </div>
    </div>
}

export default ApplicantsModal