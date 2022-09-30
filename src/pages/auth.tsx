// NextJS import
import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';

// React import
import { useLayoutEffect, useState } from 'react';

// Dependencies import
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { MdOutlineMail } from 'react-icons/md'
import { BiLockAlt } from 'react-icons/bi'
import { handleLogin, handleRegister } from '@/api/authentication/authentication';
import { toast } from 'react-toastify';
import { getProfile } from '@/api/profile/proifle';
import LoadingSpinner from '@/components/loadingSpinner';



type LoginFormValues = {
    email: string;
    password: string;
}




const Auth: NextPage = () => {

    // UseStates
    const [authenticationType, setAuthenticationType] = useState<string>("login")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isInitial, setIsInitial] = useState<boolean>(true)

    // Router
    const router = useRouter();

    //Form Hook
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        if (authenticationType === "login") {
            // Login
            const result = await handleLogin(data.email, data.password)
            if (result) {
                localStorage.setItem("token", result?.jwtToken)
                localStorage.setItem("user_id", result?.vetProfile.id!)
                router.push("/dashboard")
            }

        } else {
            const result = await handleRegister(data.email, data.password)
            if (result) {
                setAuthenticationType("login")
                toast.success("Account created, please login")
            }
        }
        setIsLoading(false)
    }

    const email = watch('email');
    const password = watch('password');



    // UseEffects
    useLayoutEffect(() => {
        (async () => {
            const token = localStorage.getItem("token")
            const user_id = localStorage.getItem("user_id")
            if (!token || !user_id || token === "" || user_id === "")
                return setIsInitial(false)

            const profile = await getProfile()


            if (profile?.vetProfile.profile_complete && profile.vetProfile.is_approved) return router.replace("/dashboard")

            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length == 0) return router.replace("/onboarding/clinic")
            if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length > 0) return router.replace("/onboarding/clinic")


            if (!profile?.vetProfile.profile_complete) return router.replace("/onboarding")


            setIsInitial(false)

        })()
    }, [])


    if (isInitial) return <LoadingSpinner />

    return <div className='w-screen h-screen flex bg-bgColor justify-center items-center text-black'>
        <Head>
            <title>Authentication</title>
        </Head>
        <div className='w-[40rem] mim-h-[20rem] bg-white rounded-lg shadow-lg flex flex-col items-center p-4 gap-y-4'>
            <span className='font-medium text-[1.5rem]'>{authenticationType === "login" ? "Connexion" : "Inscription"}</span>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-y-4 mt-[2rem]'>
                {/* Email input */}

                <div className={`flex w-[20rem] items-center gap-x-2 bg-white h-10 border-b-2 border-b-gray-400 ${email && email?.length !== 0 ? (validator.isEmail(email) ? "border-b-green-400" : "border-b-red-600") : null} `}>
                    <MdOutlineMail className='text-[1.5rem] text-gray-400' />
                    <input
                        className="outline-none bg-white w-[90%] text-black"
                        placeholder="addresse mail"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            validate: (_) => {
                                return validator.isEmail(email) || "Email is invalid"
                            }
                        })}
                        type="email"
                    />
                </div>
                {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                )}


                {/* Password input */}
                <div className={`flex items-center w-[20rem] gap-x-2 bg-white h-10 border-b-2 border-b-gray-400 ${password && password?.length !== 0 ? (password.length > 5 ? "border-b-green-400" : "border-b-red-600") : null} `}>
                    <BiLockAlt className='text-[1.5rem] text-gray-400' />
                    <input
                        className="outline-none bg-white w-[90%] text-black"
                        type="password"
                        placeholder="*********"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "password is required"
                            },
                            minLength: {
                                value: 6,
                                message: "password must be at least 6 characters"
                            }
                        })}
                    />
                </div>
                {errors.password && (
                    <span className="text-red-600">{errors.password.message}</span>
                )}

                {/* Submit button */}
                <button disabled={
                    (email != undefined && !validator.isEmail(email)) && (password != undefined && password.length < 6)
                } className="w-[10rem] h-10 bg-black text-white rounded-xl font-medium" type="submit">
                    {isLoading ? "Loading..." : authenticationType === "login" ? "Se connecter" : "Créer un compte"}
                </button>

                <span onClick={() => {
                    if (authenticationType === "login") {
                        setAuthenticationType("register")
                    } else {
                        setAuthenticationType("login")
                    }
                }} className="text-blue-600 select-none cursor-pointer">{authenticationType === "login" ? "Vous n'avez pas de compte ? Créer un compte" : "Se connecter"}</span>

            </form>
        </div >
    </div >
}

export default Auth