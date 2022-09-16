import { Appointment, Specialty, VetState } from "@/types/vet";
import { atom } from "recoil";

export const userState = atom<VetState | null>({
  key: "userState",
  default: null,
});

export const selectedSpecialtyAtom = atom<Specialty | null>({
  key: "selectedSpecialtyState",
  default: null,
});

export const selectedClinicAtom = atom<string | null>({
  key: "selectedClinicState",
  default: null,
});

export const selectedAppointmentAtom = atom<Appointment | null>({
  key: "selectedAppointmentState",
  default: null,
});