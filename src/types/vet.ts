export type VetProfile = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  phone_number: string;
  identification_order: string;
  profile_complete?: boolean;
  is_approved?: boolean;
  type?: string;
  bank_details: string;
  balance : number;
  clinics: Clinic[];
  appointments: Appointment[];
  specialities: Specialty[];
  calendar: any;
  CommentVet : CommentVet[]
};

export type CommentVet = {
  id?: string;
  owner_id: string;
  vet_id: string;
  text : string;
}

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
  price: string;
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
  MedicalReport: MedicalReport[];
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
  clinic: Clinic;
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone_number: string;
  owner_id: string;
  is_approved: boolean;
};

export type Calendar = {
  id: string;
  monday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  tuesday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  wednesday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  thursday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  friday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  saturday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  sunday: {
    morning: {
      start_at: string;
      end_at: string;
    };
    afternoon: {
      start_at: string;
      end_at: string;
    };
  };
  owner_id: string;
};
