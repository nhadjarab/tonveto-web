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

export const getClinicApplicants = async (clinicId: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.get(
      `${BACKEND_URL}/clinicApplications/${clinicId}`,
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

export const acceptClinicApplicant = async (
  clinicId: string,
  applicantId: string
) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.put(
      `${BACKEND_URL}/clinic/vet/${applicantId}`,
      {
        clinic_id: clinicId,
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

export const rejectClinicApplicant = async (
  clinicId: string,
  applicantId: string
) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.delete(
      `${BACKEND_URL}/clinic/vetApplication/${applicantId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          logged_in_id: id as string,
          clinic_id: clinicId,
        },
      }
    );

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};
