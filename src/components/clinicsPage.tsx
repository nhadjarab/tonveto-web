// React import
import { FunctionComponent, useEffect, useState } from "react";

// API import
import { getProfile } from "@/api/profile/proifle";
import { Appointment, Clinic } from "@/types/vet";

//Dependcies import
import Lottie from "react-lottie";

import noClinics from "@Lotties/noClinics.json";
import { lottieConfig } from "@/lotties/defaultConfig";
import NewClinicModal from "./newClinicModal";
import ApplicantsModal from "./applicantsModal";
import { SetRecoilState, useRecoilState } from "recoil";


// Atom import
import { selectedClinicAtom } from "@/recoil/atoms";
import VetsModal from "./vetListModal";


const ClinicsPage: FunctionComponent = () => {
    // Local State
    const [clinics, setClinics] = useState<any>([])
    const [isFetching, setIsFetching] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
    const [isListModalOpen, setIsListModalOpen] = useState(false)

    // Recoil State
    const [_selectedClinic, setSelectedClinic] = useRecoilState(selectedClinicAtom)

    const loadAppointments = async () => {
        try {
            setIsFetching(true)
            const profile = await getProfile()

            setClinics(profile?.vetProfile.clinics!)
            setIsFetching(false)
        } catch (err) {
            setIsFetching(false)
            console.log(err)

        }
    }

    useEffect(() => {

        (async () => {
            await loadAppointments()
        })()

    }, [])




    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">

        <div className="flex items-center justify-between">
            <span className="text-[1.5rem] font-medium mb-4">Cliniques</span>
            <button onClick={() => {
                setIsModalOpen(true)
            }} className="p-2 bg-black text-white rounded-lg">Nouvelle clinique</button>
        </div>


        {
            clinics.length === 0 ?
                <div className="w-full h-full flex flex-col items-center justify-center">

                    <Lottie
                        options={lottieConfig(noClinics)}
                        height={300}
                        width={300}
                    />
                    <span className="font-medium">Vous ne faites partie d&apos;aucune clinique</span>
                    <button disabled={isFetching} onClick={loadAppointments} className={`  p-2 bg-black rounded-lg text-white ${isFetching && "bg-gray-400 cursor-not-allowed"}`}>{isFetching ? "Loading..." : "Actualiser"}</button>
                </div> : <div>
                    {
                        clinics.map((clinicRelation: any) => {
                            const clinic: Clinic = clinicRelation.clinic
                            console.log(clinic)
                            const user_id = localStorage.getItem("user_id")
                            return <div key={clinic.id} className="w-full h-20 bg-white text-black rounded-lg shadow-lg flex items-center p-5 mb-5 justify-between">

                                <div className="flex flex-col">
                                    <span className="text-black font-medium text-lg">
                                        {clinic.name}
                                    </span>
                                    <span>
                                        {clinic.address}
                                    </span>
                                </div>

                                <div className="flex gap-x-2 items-center">
                                    <span className={clinic.is_approved ? "text-green-600" : "text-orange-300"}>
                                        {clinic.is_approved ? "Approuvée" : "En attente de validation"}
                                    </span>
                                    {
                                        clinic.owner_id === user_id && clinic.is_approved && <>
                                            <button onClick={() => {
                                            setSelectedClinic(clinic.id)
                                            setIsApplicantModalOpen(true)
                                        }} className="p-2 border-2 border-black rounded-lg">
                                            Liste des demandes
                                        </button>
                                        <button onClick={() => {
                                            setSelectedClinic(clinic.id)
                                            setIsListModalOpen(true)
                                        }} className="p-2 bg-black text-white rounded-lg">
                                            Membres de la clinique
                                        </button>
                                        </>
                                    }
                                </div>



                            </div>
                        })
                    }
                </div>
        }

        {isModalOpen && <NewClinicModal setIsModalOpen={setIsModalOpen} />}

        {
            isApplicantModalOpen && <ApplicantsModal setIsModalOpen={setIsApplicantModalOpen} />
        }

        {
            isListModalOpen && <VetsModal setIsModalOpen={setIsListModalOpen} />
        }



    </div>
}

export default ClinicsPage;