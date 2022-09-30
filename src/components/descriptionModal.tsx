import { FunctionComponent, useState } from "react";

import { useRecoilState } from "recoil";
import { selectedCommentAtom, selectedUserId } from "@/recoil/atoms";
import { reportCommentVet, } from "@/api/comment/comment";
import { toast } from "react-toastify";

type Props = {
    setIsModalOpen: (value: boolean) => void
}

const DescriptionModal: FunctionComponent<Props> = ({ setIsModalOpen }) => {

    const [selectedComment, setSelectedComment] = useRecoilState(selectedCommentAtom)
    const [userId, setSelectedUserId] = useRecoilState(selectedUserId)

    const [description, setDescription] = useState("")

    const handleReportComment = async () => {
        try {
            const res = await reportCommentVet(selectedComment?.id as string, userId as string, description)
            if (res && res.status === 200) {
                toast.success("Comment reported successfully")
                setSelectedComment(null)
                setSelectedUserId(null)
                setIsModalOpen(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    // Generate a modal where user can input a description for reporting a commen
    return < div onClick={() => setIsModalOpen(false)} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 " >
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center gap-y-4">
            <span>Why are you reporting this comment?</span>
            <input className="outline-none p-2 rounded-lg h-[3rem] w-full bg-white border-2 border-black" placeholder="Description" onChange={e => setDescription(e.target.value)} />

            <button onClick={handleReportComment} className={`bg-black rounded-lg p-2 text-white ${description.length === 0 && "bg-gray-400 cursor-not-allowed"}`} disabled={description.length === 0}>Submit</button>
        </div>



    </div >


}

export default DescriptionModal 
