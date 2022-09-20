// NextJS import
import { useRouter } from "next/router";

// React import
import { useState } from 'react';

// Dependencies import
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import validator from 'validator';


// API import
import { getProfile, getVetClinics } from '@/api/profile/proifle';
import { createClinic } from '@/api/clinic/clinic';

const inputClassName = "bg-white p-2 border-gray-400 border-[1px] rounded-lg outline-none focus:bourder-2"
const labelCalsseName = "font-medium"

type CreateClinicForm = {
    name: string;
    address: string;
    city: string;
    country: string;
    zip_code: string;
    phone_number: string;
}

const CreateClinic = () => {
    // Local state
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

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
            name: "",
            address: "",
            city: "",
            country: "",
            zip_code: "",
            phone_number: "",
        }
    });


    const values = watch()


    const isDisabled = (): boolean => values.name == "" || values.address == "" || values.city == "" || values.country == "" || values.phone_number == "";

    const onSubmit = async (data: CreateClinicForm) => {
        if (isDisabled()) return

        try {
            setIsSubmitting(true)
            const result = await createClinic(data)

            if (result!.status == 200) {

                toast.success("Clinic created successfully")

                const profile = await getProfile()
                if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length > 0) return router.replace("/onboarding/approval")
            }

            setIsSubmitting(false)

        } catch (error) {
            setIsSubmitting(false)
            console.log(error)
        }

    }





    return <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2 text-black items-center text-left'>


        {/* Name */}
        <label className={`${labelCalsseName}`}>Name:</label>
        <input className={`${inputClassName} w-[26rem]`} placeholder="Clinic" {...register("name", {
            required: {
                value: true,
                message: "Name is required"
            },

        })} type="text" />
        {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
        )}


        {/* Address */}
        <label className={`${labelCalsseName}`}>Address:</label>
        <input className={`${inputClassName} w-[26rem]`} {...register("address", {
            required: {
                value: true,
                message: "Address is required"
            },

        })} type="text" placeholder='123 clinic street' />
        {errors.address && (
            <span className="text-red-600">{errors.address.message}</span>
        )}

        {/* City and country container */}
        <div className='w-[]26 flex gap-x-11'>
            <div className='flex flex-col gap-y-2'>
                <label className={`${labelCalsseName}`}>County:</label>
                <input className={`${inputClassName}`} {...register("country", {
                    required: {
                        value: true,
                        message: "Country is required"
                    },

                })} placeholder='France' />
                {errors.country && (
                    <span className="text-red-600">{errors.country.message}</span>
                )}
            </div>
            <div className='flex flex-col gap-y-2'>
                <label className={`${labelCalsseName}`}> City:</label>
                <input className={`${inputClassName}`} {...register("city", {
                    required: {
                        value: true,
                        message: "City is required"
                    },

                })} placeholder='Paris' />
                {errors.city && (
                    <span className="text-red-600">{errors.city.message}</span>
                )}
            </div>
        </div>

        {/* Address */}
        <label className={`${labelCalsseName}`}>Zip Code:</label>
        <input className={`${inputClassName} w-[26rem]`} {...register("zip_code", {
            required: {
                value: true,
                message: "Zip Code is required"
            },

        })} type="text" placeholder='34978' />
        {errors.zip_code && (
            <span className="text-red-600">{errors.zip_code.message}</span>
        )}

        {/* Phone number */}

        <label className={`${labelCalsseName}`}>Phone Number:</label>
        <input className={`${inputClassName} w-[26rem]`} {...register("phone_number", {
            required: {
                value: true,
                message: "Phone number is required"
            },
            minLength: {
                value: 10,
                message: "Phone number must be at least 10 characters"
            },
            validate: (_) => {
                if (!validator.isMobilePhone(values.phone_number)) return "Phone number is invalid"
            }

        })} type="tel" placeholder='555-5555-555' />
        {errors.phone_number && (
            <span className="text-red-600">{errors.phone_number.message}</span>
        )}

        <button disabled={isDisabled()}
            className={`bg-black w-[27rem] text-white p-2 rounded-lg ${isDisabled() && "bg-gray-400 cursor-not-allowed"}`}>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
}

export default CreateClinic