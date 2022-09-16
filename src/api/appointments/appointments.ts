import { BACKEND_URL } from "@/constants/constants";

import axios from "axios";
import { toast } from "react-toastify";

export const closeTimeSlot = async (date: string, time: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/closeTimeSlot`,
      {
        date,
        time,
        vet_id: id,
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

export const openTimeSlot = async (date: string, time: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/openTimeSlot`,
      {
        date,
        time,
        vet_id: id,
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

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.delete(
      `${BACKEND_URL}/appointmentVet/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          vet_id: id as string,
        },
      }
    );

    return result;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};

export const updateAppointment = async (
  date: string,
  time: string,
  user_id: string,
  pet_id: string,
  appointmentId: string
) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.put(
      `${BACKEND_URL}/appointmentVet/${appointmentId}`,
      {
        date,
        time,
        vet_id: id,
        user_id,
        pet_id,
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

export const newAppointment = async (
  date: string,
  time: string,
  user_id: string,
  pet_id: string,
) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/appointmentVet`,
      {
        date,
        time,
        vet_id: id,
        user_id,
        pet_id,
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
