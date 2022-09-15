import { BACKEND_URL } from "@/constants/constants";
import { VetProfile, VetState } from "@/types/vet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const getProfile = async () => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.get(`${BACKEND_URL}/vet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        logged_in_id: id as string,
      },
    });

    return result.data as VetState;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
  }
};

export const updateProfile = async (profile: any) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.put(
      `${BACKEND_URL}/vet/${id}`,
      {
        ...profile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return result.data as VetProfile;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};

export const getVetClinics = async () => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.get(`${BACKEND_URL}/vetClinics/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        logged_in_id: id as string,
      },
    });

    return result.data;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};

export const getVet = async (vetId : string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.get(`${BACKEND_URL}/vet/${vetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        logged_in_id: id as string,
      },
    });

    return result
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
  }
};