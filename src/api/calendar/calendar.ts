import { BACKEND_URL } from "@/constants/constants";

import axios from "axios";
import { toast } from "react-toastify";

export const createCalendar = async (data : any) => {
  try {
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const result = await axios.post(
      `${BACKEND_URL}/calendar`,
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
  }
};

export const updateCalendar = async (data : any , calendarId : string) => {
    try {
      const id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
  
      const result = await axios.put(
        `${BACKEND_URL}/calendar/${calendarId}`,
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
    }
  };

