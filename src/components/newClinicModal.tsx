// React import
import { Tab } from "@headlessui/react";
import { FunctionComponent, useState } from "react";
import CreateClinic from "./createClinic";
import JoinClinic from "./joinClinic";


type Props = {
    setIsModalOpen: (value: boolean) => void
}

const NewClinicModal: FunctionComponent<Props> = ({ setIsModalOpen }) => {

    // Local State
    const [selected, setSelected] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    return <div onClick={() => {
        setIsModalOpen(false)
    }} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 ">
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col">
            {/* Tabs */}
            <Tab.Group


            >
                <Tab.List className=' w-[20rem] flex self-center items-center justify-center p-1 space-x-4 bg-gray-300 rounded-xl'>
                    <Tab onClick={() => setSelected(0)}
                        className={
                            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none  ${selected === 0
                                ? 'bg-white shadow'
                                : 'text-black hover:bg-white/[0.12] hover:text-white'}`

                        }>Create Clinic</Tab>
                    <Tab className={
                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none  ${selected === 1
                            ? 'bg-white shadow'
                            : 'text-black hover:bg-white/[0.12] hover:text-white'}`

                    } onClick={() => setSelected(1)}>Join Clinic</Tab>
                </Tab.List>
            </Tab.Group>

            <div className='mb-2' />

            {
                selected === 0 ? (
                    <CreateClinic />
                ) : (
                    <JoinClinic />
                )
            }

        </div>
    </div>
}

export default NewClinicModal