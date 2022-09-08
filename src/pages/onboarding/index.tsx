// NextJS import
import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';

// React import
import { useLayoutEffect, useState } from 'react';


// Dependencies import
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

// API import
import { getProfile, getVetClinics, updateProfile } from '@/api/profile/proifle';

// Atom import
import { userState } from '@/recoil/atoms';
import { VetState } from '@/types/vet';
import LoadingSpinner from '@/components/loadingSpinner';

type OnboardingForm = {
    first_name: string;
    last_name: string;
    birth_date: string;
    phone_number: string;
    bank_details: string;
    identification_order: string

}

const inputClassName = "bg-white p-2 border-gray-400 border-[1px] rounded-lg outline-none focus:bourder-2"
const labelCalsseName = "font-medium"




const Onboarding: NextPage = () => {

    // Recoil State
    const [user, setUser] = useRecoilState(userState)

    // Local state
    const [isLoading, setIsLoading] = useState(true)

    // Router
    const router = useRouter();

    //Form Hook
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<OnboardingForm>({
        defaultValues: {
            first_name: "",
            last_name: "",
            birth_date: "",
            phone_number: "",
            bank_details: "",
            identification_order: ""
        }
    });


    const values = watch()

    const isDisabled = (): boolean => values.bank_details == "" ||
        values.birth_date == "" ||
        values.first_name == "" ||
        values.identification_order == "" ||
        values.last_name == "" ||
        values.phone_number == "";

    const onSubmit = async (data: OnboardingForm) => {
        if (isDisabled()) return

        const email = (user as VetState).vetProfile.email

        const newProfile = {
            ...data,
            email
        }

        try {

            const result = await updateProfile(newProfile)
            setUser({
                vetProfile: result!,
                vetRating: user!.vetRating
            })

            toast.success("Profile updated successfully")

            const vetClinics = await getVetClinics()
            if (vetClinics.length == 0) {
                router.push("/onboarding/clinic")
            }

        } catch (error) {
            console.log(error)
        }

    }



    useLayoutEffect(() => {
        (async () => {
            const token = localStorage.getItem("token")
            const user_id = localStorage.getItem("user_id")
            if (!token || !user_id || token === "" || user_id === "")
                return router.push("/auth")

            const profile = await getProfile()

            setUser(profile!)

            if (profile?.vetProfile.profile_complete && profile.vetProfile.is_approved) return router.push("/dashboard")

            const vetClinics = await getVetClinics()
            if (profile?.vetProfile.profile_complete && profile?.vetProfile.clinics.length === 0) {
                return router.push("/onboarding/clinic")
            }

            setIsLoading(false)

        })()
    }, [])


    if (isLoading) {
        return <LoadingSpinner />
    }

    return <div>
        <Head><title>Onboarding</title></Head>

        <div className='w-screen h-screen bg-bgColor flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-fit min-h[20rem] text-black bg-white p-8  flex flex-col rounded-lg shadow-lg gap-y-2'>
                    {/* Full name container */}
                    <div className='w-[]26 flex gap-x-11'>
                        <div className='flex flex-col gap-y-2'>
                            <label className={`${labelCalsseName}`}>First Name:</label>
                            <input className={`${inputClassName}`} {...register("first_name", {
                                required: {
                                    value: true,
                                    message: "First Name is required"
                                },

                            })} placeholder='John' />
                            {errors.first_name && (
                                <span className="text-red-600">{errors.first_name.message}</span>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className={`${labelCalsseName}`}>Last Name:</label>
                            <input className={`${inputClassName}`} {...register("last_name", {
                                required: {
                                    value: true,
                                    message: "Last Name is required"
                                },

                            })} placeholder='Doe' />
                            {errors.last_name && (
                                <span className="text-red-600">{errors.last_name.message}</span>
                            )}
                        </div>
                    </div>

                    {/* BirthDate */}
                    <label className={`${labelCalsseName}`}>Birth date:</label>
                    <input className={`${inputClassName} w-[26rem]`} {...register("birth_date", {
                        required: {
                            value: true,
                            message: "Birth Date is required"
                        },

                    })} type="date" />
                    {errors.birth_date && (
                        <span className="text-red-600">{errors.birth_date.message}</span>
                    )}
                    {/* Phone number */}

                    <label className={`${labelCalsseName}`}>Phone Number:</label>
                    <input className={`${inputClassName} w-[26rem]`} {...register("phone_number", {
                        required: {
                            value: true,
                            message: "Phone number is required"
                        },

                    })} type="tel" placeholder='555-5555-555' />
                    {errors.phone_number && (
                        <span className="text-red-600">{errors.phone_number.message}</span>
                    )}
                    {/* Bank */}
                    <label className={`${labelCalsseName}`}>IBAN:</label>
                    <input className={`${inputClassName} w-[26rem]`} {...register("bank_details", {
                        required: {
                            value: true,
                            message: "Iban is required"
                        },

                    })} type="number" placeholder='12344567878976' />
                    {errors.bank_details && (
                        <span className="text-red-600">{errors.bank_details.message}</span>
                    )}
                    {/* Identification Order */}
                    <label className={`${labelCalsseName}`}>Identification Order:</label>
                    <input className={`${inputClassName} w-[26rem]`} {...register("identification_order", {
                        required: {
                            value: true,
                            message: "Field is required"
                        },

                    })} type="number" placeholder='11111111' />
                    {errors.identification_order && (
                        <span className="text-red-600">{errors.identification_order.message}</span>
                    )}
                    <button disabled={isDisabled()}
                        className={`bg-black text-white p-2 rounded-lg ${isDisabled() && "bg-gray-400 cursor-not-allowed"}`}>Submit</button>
                </div>
            </form>
        </div>
    </div>

}

export default Onboarding