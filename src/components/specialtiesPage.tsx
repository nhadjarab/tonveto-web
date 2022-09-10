// React import
import { FunctionComponent, useEffect, useState } from "react";

// API import
import { getProfile } from "@/api/profile/proifle";
import { Appointment, Specialty } from "@/types/vet";

//Dependcies import
import Lottie from "react-lottie";

import specialty from "@Lotties/specialties.json";
import { lottieConfig } from "@/lotties/defaultConfig";
import NewSpecialtyModal from "./newSpecialtyModal";
import SpecialtyComponent from "./specialty";



const SpecialtiesPage: FunctionComponent = () => {

    // Local state
    const [specialties, setSpecialties] = useState<Specialty[]>([])
    const [isFetching, setIsFetching] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const loadSpecialties = async () => {
        try {
            setIsFetching(true)
            const profile = await getProfile()
            console.log(profile)
            setSpecialties(profile?.vetProfile.specialities!)
            setIsFetching(false)
        } catch (err) {
            setIsFetching(false)
            console.log(err)

        }
    }

    useEffect(() => {

        (async () => {
            await loadSpecialties()
        })()

    }, [])


    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">
        <div className="flex w-full items-center justify-between">

            <span className="text-[1.5rem] font-medium">Specialties</span>
            <button onClick={() => setIsModalOpen(true)} className="p-2 border-[1px] border-black rounded-lg">+ Add Specialty</button>
        </div>



        {
            specialties.length === 0 ?
                <div className="w-full h-full flex flex-col items-center justify-center">

                    <Lottie
                        options={lottieConfig(specialty)}
                        height={300}
                        width={300}
                    />
                    <span className="font-medium">You do not have any specialties yet!</span>
                    <button disabled={isFetching} onClick={loadSpecialties} className={`  p-2 bg-black rounded-lg text-white ${isFetching && "bg-gray-400 cursor-not-allowed"}`}>{isFetching ? "Loading..." : "Refresh"}</button>
                </div> : <div className="mt-4 w-full grid grid-flow-col auto-cols-max gap-4">
                    {
                        specialties.map((specialty, index) => {
                            return <SpecialtyComponent key={specialty.id} specialty={specialty} setIsModalOpen={setIsModalOpen} loadSpecialties={loadSpecialties} />
                        })
                    }
                </div>
        }



        {isModalOpen && <NewSpecialtyModal setIsModalOpen={setIsModalOpen} loadSpecialties={loadSpecialties} />}
    </div>
}

export default SpecialtiesPage;