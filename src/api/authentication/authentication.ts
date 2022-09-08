import { BACKEND_URL } from "@/constants/constants";
import { VetAuth, VetProfile } from "@/types/vet";
import axios from "axios";
import { toast } from "react-toastify";

export const handleLogin = async (email: string, password: string) => {
  try {
    const result = await axios.post(`${BACKEND_URL}/loginVet`, {
      email,
      password,
    });

    return result.data as VetAuth;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};

export const handleRegister = async (email: string, password: string) => {
  try {
    const result = await axios.post(`${BACKEND_URL}/registerVet`, {
      email,
      password,
    });
    return result.data;
  } catch (e) {
    toast.error(JSON.stringify((e as any).response.data));
    console.log(e);
  }
};
