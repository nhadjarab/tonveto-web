import { BACKEND_URL } from "@/constants/constants";
import { VetProfile, VetState } from "@/types/vet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const reportCommentVet = async (commentId: string, vetId: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/reportCommentVet/${commentId}`,
      {
        user_type: "vet",
        vet_id: vetId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          logged_in_id: id as string,
        },
      }
    );

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};
