export type VetProfile = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone_number: string;
  identification_order: number;
  profile_complete?: boolean;
  is_approved?: boolean;
  type?: string;
  bank_details: string;
  clinics: Clinic[];
};

export type VetAuth = {
  vetProfile: VetProfile;
  jwtToken: string;
};

export type VetState = {
  vetProfile: VetProfile;
  vetRating: VetRating;
};

export type VetRating = {
  _avg: {
    rating: number | null;
  };
};

export type Specialty = {
  id: string;
  name: string;
  price: number;
  vet?: VetProfile;
  vet_id: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone_number: string;
  profile_complete: boolean;
  type: string;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  pet?: Pet;
  pet_id: string;
  vet?: VetProfile;
  vet_id: string;
  user: User;
  user_id: string;
  MedicalReport: MedicalReport;
};

export type Pet = {
  id: string;
  sex: string;
  name: string;
  birth_date: string;
  species: string;
  breed: string;
  crossbreed: boolean;
  sterilised: boolean;
  owner?: User;
  owner_id: string;
  appointments: Appointment[];
  MedicalReport: MedicalReport[];
};

export type MedicalReport = {
  id: string;
  appointment_id: string;
  appointment: Appointment;
  reason: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  pet_id: string;
  pet: Pet;
  vet_id: string;
  vet: VetProfile;
};

export type Clinic = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone_number: string;
  owner_id: string;
  is_approved: boolean;
};
