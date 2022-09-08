import { BACKEND_URL } from "@/constants/constants";
import { VetProfile, VetState } from "@/types/vet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const createClinic = async (clinicDetails: any) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/clinic`,
      {
        ...clinicDetails,
        owner_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};

export const joinClinic = async (clinicId: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");


    const result = await axios.post(
      `${BACKEND_URL}/joinClinic/${clinicId}`,
      {},
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
