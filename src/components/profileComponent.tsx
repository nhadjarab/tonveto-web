import Image from "next/image";

// React import
import { FunctionComponent, useState } from "react";

import { VetState, Clinic } from "@/types/vet";
import { reportCommentVet } from "@/api/comment/comment";
import { toast } from "react-toastify";

import { useRecoilState } from "recoil"
import { selectedCommentAtom, selectedUserId } from "@/recoil/atoms"
import DescriptionModal from "./descriptionModal";

type Props = {
    user: VetState
}

const ProfileComponent: FunctionComponent<Props> = ({ user }) => {

    const [_selectedComment, setSelectedComment] = useRecoilState(selectedCommentAtom)
    const [_userId, setSelectedUserId] = useRecoilState(selectedUserId)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!user) return null





    console.log(user)

    return <div className="w-full h-full bg-white overflow-scroll p-6 rounded-lg flex flex-col gap-y-2 shadow-lg">
        <div className="self-center flex flex-col items-center justify-center">
            <div className="w-[3rem] h-[3rem] mb-2 relative rounded-full shadow-lg flex items-center justify-center">
                <span className="font-medium text-lg">{user?.vetProfile.first_name[0]}{user?.vetProfile.last_name[0]}</span>
            </div>
            <span className="font-medium text-lg">{user?.vetProfile.first_name} {user?.vetProfile.last_name}</span>
            <span className="font-medium text-sm">ID NO: {user?.vetProfile.identification_order}</span>
            <span className="font-medium text-sm">Wallet: €{user?.vetProfile.balance}</span>
            {user?.vetRating._avg.rating != null && <span>{user?.vetRating._avg.rating}/5</span>}
        </div>

        <span className="font-medium text-lg">Clinics</span>
        <div className="flex flex-wrap gap-2">
            {user?.vetProfile.clinics.length === 0 ? "Vet is not part of any clinic" : user?.vetProfile.clinics.map((clinicProfile) => {
                const clinic: Clinic = clinicProfile.clinic

                return <div key={clinic.id} className="w-[calc(100%/3)] h-[5rem] bg-gray-100 rounded-lg flex flex-col justify-center items-center">
                    <span className="font-medium text-sm">{clinic.name}
                    </span>
                    <span className="font-medium text-sm">{clinic.address}, {clinic.city}, {clinic.country}</span>
                </div>
            })}
        </div>

        <span className="font-medium text-lg">Working Hours</span>
        <div className="flex flex-wrap gap-2">
            {user?.vetProfile.calendar.length === 0 ? "Vet does not have working hours" : <>
                <WorkHour title="Monday" day={user?.vetProfile.calendar[0].monday} />
                <WorkHour title="Tuesday" day={user?.vetProfile.calendar[0].tuesday} />
                <WorkHour title="Wednesday" day={user?.vetProfile.calendar[0].wednesday} />
                <WorkHour title="Thursday" day={user?.vetProfile.calendar[0].thursday} />
                <WorkHour title="Friday" day={user?.vetProfile.calendar[0].friday} />
                <WorkHour title="Saturday" day={user?.vetProfile.calendar[0].saturday} />
                <WorkHour title="Sunday" day={user?.vetProfile.calendar[0].sunday} />
            </>
            }
        </div>

        <span className="font-medium text-lg">Comments:</span>
        {
            user?.vetProfile.CommentVet.length === 0 ? "No comments" : user?.vetProfile.CommentVet.map((comment) => {

                return <div key={comment.id} className="w-full h-[5rem] p-2 bg-gray-100 rounded-lg flex flex-col justify-center items-center relative">
                    <span className="font-medium text-sm">{comment.text}
                    </span>
                    <button onClick={() => {
                        setSelectedComment(comment)
                        setSelectedUserId(user.vetProfile.id)
                        setIsModalOpen(true)
                    }} className="absolute top-2 right-2 text-sm text-red-600">
                        report comment
                    </button>
                    <button className="absolute top-2 left-2 text-sm">
                        {comment.owner.first_name} {comment.owner.last_name}
                    </button>
                </div>
            }
            )
        }


        {isModalOpen && <DescriptionModal setIsModalOpen={setIsModalOpen} />}
    </div>




}

export default ProfileComponent;

type WorkHourProps = {
    title: string
    day: any
}

const WorkHour: FunctionComponent<WorkHourProps> = ({
    title,
    day
}) => {
    return <div className="flex items-center gap-x-2 border-2 border-gray-400 p-2 rounded-md">
        <span>{title}:</span>
        <div className="flex flex-col gap-y-1">
            {
                JSON.parse(day) === "closed" ? "closed" :
                    <>
                        <span>{JSON.parse(day).morning.start_at}- {JSON.parse(day).morning.end_at}</span>
                        <span>{JSON.parse(day).afternoon.start_at}- {JSON.parse(day).afternoon.end_at}</span>
                    </>
            }
        </div>
    </div>
}
