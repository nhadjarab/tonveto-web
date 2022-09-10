import { BACKEND_URL } from "@/constants/constants";
import { VetProfile, VetState } from "@/types/vet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const createSpecialty = async (name: string, price: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/specialty`,
      {
        name,
        price,
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

export const deleteSpecialty = async (specialtyId: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.delete(
      `${BACKEND_URL}/specialty/${specialtyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          owner_id: id as string,
        },
      }
    );

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
  }
};
