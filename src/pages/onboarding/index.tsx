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
import validator from 'validator';


// API import
import { getProfile, getVetClinics, updateProfile } from '@/api/profile/proifle';

// Atom import
import { userState } from '@/recoil/atoms';
import { VetState } from '@/types/vet';
import LoadingSpinner from '@/components/loadingSpinner';
import moment from 'moment';
import { createCalendar } from '@/api/calendar/calendar';

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

            if (result && result.status === 200) {

                setUser({
                    vetProfile: result.data!,
                    vetRating: user!.vetRating
                })

                toast.success("Profile updated successfully")

                const workDay = {
                    "monday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "tuesday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "wednesday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "thursday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "friday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "saturday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "sunday": {
                        "morning": {
                            "start_at": "08:00",
                            "end_at": "12:00",
                        },
                        "afternoon": {
                            "start_at": "12:30",
                            "end_at": "19:00"
                        }
                    },
                    "owner_id": localStorage.getItem("user_id")
                }

                await createCalendar(workDay)

                const vetClinics = await getVetClinics()
                if (vetClinics.length == 0) {
                    router.push("/onboarding/clinic")
                }
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

        <div className='w-screen h-screen bg-bgColor flex  flex-col justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-fit min-h[20rem] text-black bg-white p-8  flex flex-col rounded-lg shadow-lg gap-y-2'>
                    {/* Full name container */}
                    <div className='w-[]26 flex gap-x-11'>
                        <div className='flex flex-col gap-y-2'>
                            <label className={`${labelCalsseName}`}>Pr??nom:</label>
                            <input className={`${inputClassName}`} {...register("first_name", {
                                required: {
                                    value: true,
                                    message: "First Name is required"
                                },
                                validate: (_) => {
                                    return validator.isAlpha(values.first_name) || "First Name must be alphabetic"
                                }

                            })} placeholder='Fran??ois' />
                            {errors.first_name && (
                                <span className="text-red-600">{errors.first_name.message}</span>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className={`${labelCalsseName}`}>Nom:</label>
                            <input className={`${inputClassName}`} {...register("last_name", {
                                required: {
                                    value: true,
                                    message: "Last Name is required"
                                },
                                validate: (_) => {
                                    return validator.isAlpha(values.last_name) || "Last Name must be alphabetic"
                                }

                            })} placeholder='Dupont' />
                            {errors.last_name && (
                                <span className="text-red-600">{errors.last_name.message}</span>
                            )}
                        </div>
                    </div>

                    {/* BirthDate */}
                    <label className={`${labelCalsseName}`}>Date de naissance:</label>
                    <input className={`${inputClassName} w-[26rem]`} {...register("birth_date", {
                        required: {
                            value: true,
                            message: "Birth Date is required"
                        },
                        validate: (_) => {
                            return validator.isDate(values.birth_date) && moment(values.birth_date).isAfter(moment("1922")) && moment(values.birth_date).isBefore(moment("2005")) || "Birth Date must be a valid date"
                        }

                    })} type="date" />
                    {errors.birth_date && (
                        <span className="text-red-600">{errors.birth_date.message}</span>
                    )}
                    {/* Phone number */}

                    <label className={`${labelCalsseName}`}>T??l??phone:</label>
                    <input className={`${inputClassName} w-[26rem]`} {...register("phone_number", {
                        required: {
                            value: true,
                            message: "Phone number is required"
                        },
                        minLength: {
                            value: 10,
                            message: "Phone number must be 10 digits"
                        },
                        validate: (_) => {
                            return validator.isMobilePhone(values.phone_number) || "Invalid phone number"
                        }

                    })} type="tel" placeholder='0600001234' />
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
                        validate: (_) => {
                            return validator.isIBAN(values.bank_details) || "Invalid IBAN"
                        }

                    })} type="text" placeholder='12344567878976' />
                    {errors.bank_details && (
                        <span className="text-red-600">{errors.bank_details.message}</span>
                    )}
                    {/* Identification Order */}
                    <label className={`${labelCalsseName}`}>Num??ro ordinal:</label>
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
                        className={`bg-black text-white p-2 rounded-lg ${isDisabled() && "bg-gray-400 cursor-not-allowed"}`}>Valider</button>
                </div>
            </form>
            <button onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user_id")
                    router.replace("/")
                }} className='p-2 bg-black rounded-lg text-white mt-5'>
                    D??connexion
                </button>
        </div>


    </div>

}

export default Onboarding