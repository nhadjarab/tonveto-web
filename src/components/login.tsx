// React imports
import { FunctionComponent } from "react";


// Dependencies import
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { MdOutlineMail } from 'react-icons/md'
import { BiLockAlt } from 'react-icons/bi'

type LoginFormValues = {
    email: string;
    password: string;
}

const LoginForm: FunctionComponent = () => {
    //Form Hook
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit = (data: LoginFormValues) => {
        console.log(data);
    }

    const email = watch('email');
    const password = watch('password');

    return <form className='w-full flex flex-col items-center gap-y-4 mt-[2rem]'>
        {/* Email input */}

        <div className={`flex w-[20rem] items-center gap-x-2 bg-white h-10 border-b-2 border-b-gray-400 ${email && email?.length !== 0 ? (validator.isEmail(email) ? "border-b-green-400" : "border-b-red-600") : null} `}>
            <MdOutlineMail className='text-[1.5rem] text-gray-400' />
            <input
                className="outline-none bg-white w-[90%] text-black"
                placeholder="gavin.belson@hooli.com"
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
            Login
        </button>

    </form>
}

export default LoginForm;