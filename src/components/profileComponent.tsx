import Image from "next/image";

// React import
import { FunctionComponent } from "react";

import { VetState, Clinic } from "@/types/vet";
import { reportCommentVet } from "@/api/comment/comment";
import { toast } from "react-toastify";
type Props = {
    user: VetState
}

const ProfileComponent: FunctionComponent<Props> = ({ user }) => {

    if (!user) return null


    const handleReportComment = async (commentId: string) => {
        try {
            const res = await reportCommentVet(commentId, user.vetProfile.id as string)
            if (res && res.status === 200) {
                toast.success("Comment reported successfully")
            }
        }
        catch (err) {
            console.log(err)
        }
    }



    console.log(user)

    return <div className="w-full h-full bg-white overflow-scroll p-6 rounded-lg flex flex-col gap-y-2 shadow-lg">
        <div className="self-center flex flex-col items-center justify-center">
            <div className="w-[3rem] h-[3rem] mb-2 relative rounded-full shadow-lg flex items-center justify-center">
            <span className="font-medium text-lg">{user?.vetProfile.first_name[0]}{user?.vetProfile.last_name[0]}</span>
            </div>
            <span className="font-medium text-lg">{user?.vetProfile.first_name} {user?.vetProfile.last_name}</span>
            <span className="font-medium text-sm">Numéro ordinal: {user?.vetProfile.identification_order}</span>
            <span className="font-medium text-sm">Balance: {user?.vetProfile.balance} €</span>
            {user?.vetRating._avg.rating != null && <span>{user?.vetRating._avg.rating}/5</span>}
        </div>

        <span className="font-medium text-lg">Cliniques</span>
        <div className="flex flex-wrap gap-2">
            {user?.vetProfile.clinics.length === 0 ? "Vous n'êtes dans aucune clinique" : user?.vetProfile.clinics.map((clinicProfile) => {
                const clinic: Clinic = clinicProfile.clinic

                return <div key={clinic.id} className="w-[calc(100%/3)] h-[5rem] bg-gray-100 rounded-lg flex flex-col justify-center items-center">
                    <span className="font-medium text-sm">{clinic.name}
                    </span>
                    <span className="font-medium text-sm">{clinic.address}, {clinic.city}, {clinic.country}</span>
                </div>
            })}
        </div>

        <span className="font-medium text-lg">Horaires</span>
        <div className="flex flex-wrap gap-2">
            {user?.vetProfile.calendar.length === 0 ? "Vet does not have working hours" : <>
                <WorkHour title="Lundi" day={user?.vetProfile.calendar[0].monday} />
                <WorkHour title="Mardi" day={user?.vetProfile.calendar[0].tuesday} />
                <WorkHour title="Mercredi" day={user?.vetProfile.calendar[0].wednesday} />
                <WorkHour title="Jeudi" day={user?.vetProfile.calendar[0].thursday} />
                <WorkHour title="Vendredi" day={user?.vetProfile.calendar[0].friday} />
                <WorkHour title="Samedi" day={user?.vetProfile.calendar[0].saturday} />
                <WorkHour title="Dimanche" day={user?.vetProfile.calendar[0].sunday} />
            </>
            }
        </div>

        <span className="font-medium text-lg">Commentaires:</span>
        {   
            user?.vetProfile.CommentVet.length === 0 ? "Vous n'avez pas de commentaires" : user?.vetProfile.CommentVet.map((comment) => {

                console.log(comment)

                return <div key={comment.id} className="w-full h-[5rem] p-2 bg-gray-100 rounded-lg flex flex-col justify-center items-center relative">
                    <span className="font-medium text-sm">{comment.text}
                    </span>
                    <button onClick={() => handleReportComment(comment.id as string)} className="absolute top-2 right-2 text-sm text-red-600">
                        Signaler commentaire
                    </button>
                    <button  className="absolute top-2 left-2 text-sm">
                        {comment.owner.first_name} {comment.owner.last_name}
                    </button>
                </div>
            }
            )
        }
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
                JSON.parse(day) === "closed" ? "Fermé" :
                    <>
                        <span>{JSON.parse(day).morning.start_at}- {JSON.parse(day).morning.end_at}</span>
                        <span>{JSON.parse(day).afternoon.start_at}- {JSON.parse(day).afternoon.end_at}</span>
                    </>
            }
        </div>
    </div>
}