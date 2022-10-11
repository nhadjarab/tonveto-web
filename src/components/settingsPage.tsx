// React import
import { FunctionComponent, useEffect, useState } from "react";

// API import
import { getProfile, updateProfile } from "@/api/profile/proifle";
import { Appointment, Specialty, VetProfile } from "@/types/vet";

//Dependcies import
import { useForm } from 'react-hook-form';
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import validator from 'validator';

import LoadingSpinner from "./loadingSpinner";
import moment from "moment";


type settingsForm = {
    first_name: string;
    email: string;
    last_name: string;
    birth_date: string;
    phone_number: string;
    bank_details: string;


}

const inputClassName = "bg-white p-2 border-gray-400 border-[1px] rounded-lg outline-none focus:bourder-2"
const labelCalsseName = "font-medium"

const SettingsPage: FunctionComponent = () => {

    // Local state
    const [userProfile, setUserProfile] = useState<VetProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const loadProfile = async () => {
        try {
            setIsLoading(true)
            const profile = await getProfile()
            setUserProfile(profile?.vetProfile!)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)

        }
    }

    useEffect(() => {

        (async () => {
            await loadProfile()
        })()

    }, [])


    //Form Hook
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<settingsForm>({
        // defaultValues: {
        //     first_name: userProfile ? userProfile.first_name : "",
        //     last_name: userProfile ? userProfile.last_name : "",
        //     email: userProfile ? userProfile.email : "",
        //     birth_date: userProfile ? userProfile.birth_date : "",
        //     phone_number: userProfile ? userProfile.phone_number : "",
        //     bank_details: userProfile ? userProfile.bank_details : "",
        //     identification_order: userProfile ? userProfile.identification_order : ""
        // }
    });

    const values = watch()



    const isDisabled = (): boolean => values.bank_details == "" ||
        values.birth_date == "" ||
        values.first_name == "" ||

        values.last_name == "" ||
        values.phone_number == "" ||
        values.email == "" ||
        isEmail(values.email ? values.email : "") == false ||
        (values.email == userProfile?.email &&
            values.first_name == userProfile?.first_name &&
            values.last_name == userProfile?.last_name &&
            values.birth_date == userProfile?.birth_date &&
            values.phone_number == userProfile?.phone_number &&
            values.bank_details == userProfile?.bank_details)



    const onSubmit = async (data: settingsForm) => {
        if (isDisabled()) return


        const newProfile = {
            ...data,
            identification_order : userProfile?.identification_order,
        }

        try {

            const result = await updateProfile(newProfile)

            if (result && result.status === 200) {


                toast.success("Profile updated successfully")
                await loadProfile()

            }

        } catch (error) {
            console.log(error)
        }

    }


    if (isLoading) return <LoadingSpinner />

    return <div className="w-[calc(100%-18rem)] h-screen flex flex-col text-black p-10">
        <div className="flex w-full items-center justify-between">

            <span className="text-[1.5rem] font-medium">Mes informations</span>

        </div>

        <div className='w-full h-full bg-bgColor flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-fit min-h[20rem] text-black bg-white p-8  flex flex-col rounded-lg shadow-lg gap-y-2'>
                    {/* Full name container */}
                    <div className='w-[]26 flex gap-x-11'>
                        <div className='flex flex-col gap-y-2'>
                            <label className={`${labelCalsseName}`}>Prénom:</label>
                            <input defaultValue={userProfile ? userProfile.first_name : ""} className={`${inputClassName}`} {...register("first_name", {
                                required: {
                                    value: true,
                                    message: "First Name is required"
                                },
                                validate: (_) => {
                                    return validator.isAlpha(values.first_name) || "First Name must be alphabetic"
                                }

                            })} placeholder='John' />
                            {errors.first_name && (
                                <span className="text-red-600">{errors.first_name.message}</span>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className={`${labelCalsseName}`}>Nom:</label>
                            <input defaultValue={userProfile ? userProfile.last_name : ""} className={`${inputClassName}`} {...register("last_name", {
                                required: {
                                    value: true,
                                    message: "Last Name is required"
                                },
                                validate: (_) => {
                                    return validator.isAlpha(values.last_name) || "Last Name must be alphabetic"
                                }

                            })} placeholder='Doe' />
                            {errors.last_name && (
                                <span className="text-red-600">{errors.last_name.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <label className={`${labelCalsseName}`}>Email:</label>
                    <input defaultValue={userProfile ? userProfile.email : ""} className={`${inputClassName} w-[26rem]`} placeholder="john.doe@vetolib.com" {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required"
                        },
                        validate: (_) => {
                            return validator.isEmail(values.email) || "Email is not valid"
                        }


                    })} type="email" />
                    {errors.email && (
                        <span className="text-red-600">{errors.email.message}</span>
                    )}


                    {/* BirthDate */}
                    <label className={`${labelCalsseName}`}>Date de naissance:</label>
                    <input defaultValue={userProfile ? userProfile.birth_date : ""} className={`${inputClassName} w-[26rem]`} {...register("birth_date", {
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

                    <label className={`${labelCalsseName}`}>Téléphone:</label>
                    <input defaultValue={userProfile ? userProfile.phone_number : ""} className={`${inputClassName} w-[26rem]`} {...register("phone_number", {
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

                    })} type="tel" placeholder='555-5555-555' />
                    {errors.phone_number && (
                        <span className="text-red-600">{errors.phone_number.message}</span>
                    )}
                    {/* Bank */}
                    <label className={`${labelCalsseName}`}>IBAN:</label>
                    <input defaultValue={userProfile ? userProfile.bank_details : ""} className={`${inputClassName} w-[26rem]`} {...register("bank_details", {
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

                    <button disabled={isDisabled()}
                        className={`bg-black text-white p-2 rounded-lg ${isDisabled() && "bg-gray-400 cursor-not-allowed"}`}>Mettre à jour mes informations</button>
                </div>
            </form>
        </div>





    </div>
}

export default SettingsPage;