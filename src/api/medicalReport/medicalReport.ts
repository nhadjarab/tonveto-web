import { BACKEND_URL } from "@/constants/constants";

import axios from "axios";
import { toast } from "react-toastify";

export const addMedicalReport = async (data : any) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/report`,
      {
        ...data
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

export const updateMedicalReport = async (data : any , medicalRecordId : string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.put(
      `${BACKEND_URL}/report/${medicalRecordId}`,
      {
        ...data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          logged_in_id : id as string
        },
      }
    );

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};


