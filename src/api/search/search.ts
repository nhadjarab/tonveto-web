import { BACKEND_URL } from "@/constants/constants";
import { VetProfile, VetState } from "@/types/vet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const search = async (query : string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.get(`${BACKEND_URL}/search/${query}`);

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};
