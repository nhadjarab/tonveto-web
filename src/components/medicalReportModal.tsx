// NextJS import
import { useRouter } from "next/router";

// React import
import { FunctionComponent, useEffect, useState } from 'react';

// Dependencies import
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


// API import
import { getProfile, getVetClinics } from '@/api/profile/proifle';
import { createClinic } from '@/api/clinic/clinic';

import { useRecoilState } from "recoil";
import { selectedAppointmentAtom } from "@/recoil/atoms";
import { addMedicalReport, updateMedicalReport } from "@/api/medicalReport/medicalReport";
import { updateAppointment } from "@/api/appointments/appointments";

const inputClassName = "bg-white p-2 border-gray-400 border-[1px] rounded-lg outline-none focus:bourder-2"
const labelCalsseName = "font-medium"

type CreateClinicForm = {
    reason: string;
    diagnosis: string;
    treatment: string;
    notes: string;

}

type Props = {
    setIsModalOpen: (value: boolean) => void;
    loadAppintments: () => void;
}


const MedicalReportModal: FunctionComponent<Props> = ({ setIsModalOpen, loadAppintments }) => {
    // Local state
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [report, setReport] = useState(null)


    // Recoil state
    const [selectedAppointment, setSelectedAppointment] = useRecoilState(selectedAppointmentAtom);

    // Router
    const router = useRouter();




    //Form Hook
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateClinicForm>({
        defaultValues: {
            reason: selectedAppointment!.MedicalReport.length > 0 ? selectedAppointment?.MedicalReport[0]?.reason : "",
            diagnosis: selectedAppointment!.MedicalReport.length > 0 ? selectedAppointment?.MedicalReport[0]?.diagnosis : "",
            treatment: selectedAppointment!.MedicalReport.length > 0 ? selectedAppointment?.MedicalReport[0]?.treatment : "",
            notes: selectedAppointment!.MedicalReport.length > 0 ? selectedAppointment?.MedicalReport[0]?.notes : "",

        }
    });


    const values = watch()


    const isDisabled = (): boolean => values.reason == "" || values.diagnosis == "" || values.treatment == ""

    const onSubmit = async (data: CreateClinicForm) => {
        if (isDisabled()) return

        try {
            setIsSubmitting(true)

            const reportData = {
                ...data,
                appointment_id: selectedAppointment!.id,
                pet_id: selectedAppointment!.pet_id,
                vet_id: selectedAppointment!.vet_id,
            }

            let result;
            if (selectedAppointment!.MedicalReport.length === 0) {

                result = await addMedicalReport(reportData)
            } else {
                result = await updateMedicalReport(reportData, selectedAppointment!.MedicalReport[0].id)

            }

            if (result!.status == 200) {

                toast.success(selectedAppointment!.MedicalReport.length === 0 ? "Medical Report created successfully" : "Medical Report updated successfully")

                loadAppintments()
                setIsModalOpen(false)

            }

            setIsSubmitting(false)

        } catch (error) {
            setIsSubmitting(false)
            console.log(error)
        }

    }




    console.log(selectedAppointment)


    return <div onClick={() => {
        setSelectedAppointment(null)
        setIsModalOpen(false)
    }} className="cursor-pointer h-screen w-screen bg-black/30 absolute top-0 left-0 flex items-center justify-center z-20 " >
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="w-[40rem] min-h-[20rem] bg-white rounded-lg shadow-lg p-8 flex flex-col"><form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2 text-black items-center text-left'>


                {/* Name */}
                <label className={`${labelCalsseName}`}>Motif de la visite</label>
                <input
                    defaultValue={values.reason}
                    className={`${inputClassName} w-[26rem]`} placeholder="consultation générale" {...register("reason", {
                        required: {
                            value: true,
                            message: "reason is required"
                        },

                    })} type="text" />
                {errors.reason && (
                    <span className="text-red-600">{errors.reason.message}</span>
                )}


                {/* Address */}
                <label className={`${labelCalsseName}`}>Diagnostic</label>
                <input
                    defaultValue={values.diagnosis}
                    className={`${inputClassName} w-[26rem]`} {...register("diagnosis", {
                        required: {
                            value: true,
                            message: "diagnosis is required"
                        },

                    })} type="text" placeholder='Diagnostic' />
                {errors.diagnosis && (
                    <span className="text-red-600">{errors.diagnosis.message}</span>
                )}

                {/* Address */}
                <label className={`${labelCalsseName}`}>Traitement</label>
                <input
                    defaultValue={values.treatment}
                    className={`${inputClassName} w-[26rem]`} {...register("treatment", {
                        required: {
                            value: true,
                            message: "treatment is required"
                        },

                    })} type="text" placeholder='Traitement' />
                {errors.treatment && (
                    <span className="text-red-600">{errors.treatment.message}</span>
                )}


                {/* Address */}
                <label className={`${labelCalsseName}`}>Notes</label>
                <textarea
                    defaultValue={values.notes}
                    className={`${inputClassName} w-[26rem] h-[10rem] resize-none`} {...register("notes", {
                        required: false
                    })} placeholder='Notes' />
                {errors.notes && (
                    <span className="text-red-600">{errors.notes.message}</span>
                )}

                <button disabled={isDisabled() || (values.diagnosis === selectedAppointment?.MedicalReport[0]?.diagnosis && values.reason === selectedAppointment?.MedicalReport[0]?.reason && values.treatment === selectedAppointment?.MedicalReport[0]?.treatment &&
                    values.notes === selectedAppointment?.MedicalReport[0]?.notes)} className={`bg-black text-white p-2 rounded-lg w-[26rem] ${isDisabled() || (values.diagnosis === selectedAppointment?.MedicalReport[0]?.diagnosis && values.reason === selectedAppointment?.MedicalReport[0]?.reason && values.treatment === selectedAppointment?.MedicalReport[0]?.treatment &&
                        values.notes === selectedAppointment?.MedicalReport[0]?.notes) ? "bg-gray-400 cursor-not-allowed" : ""}`} type="submit">{isSubmitting ? "Updating..." : selectedAppointment!.MedicalReport.length > 0 ? "OK" : "OK"}</button>

            </form>
        </div></div>
}

export default MedicalReportModal