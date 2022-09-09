// React import

import { FunctionComponent, useEffect, useState } from "react";

type Props = {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void
}


const NewSpecialtyModal: FunctionComponent<Props> = ({ isModalOpen, setIsModalOpen }) => {
    return <div onClick={(e) => {
        setIsModalOpen(false)
    }} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 ">
        <div onClick={(e) => {
            e.stopPropagation()

        }} className="cursor-default w-[40rem] h-[20rem] rounded-lg bg-white p-6">
            <div className="flex justify-between">
                <span className="font-medium text-[1.2rem]">New Specialty</span>

            </div>
        </div>
    </div>
}

export default NewSpecialtyModal;