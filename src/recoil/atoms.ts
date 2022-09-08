import { VetState } from "@/types/vet";
import { atom } from "recoil";

export const userState = atom<VetState | null>({
  key: "userState",
  default: null,
});
