// NextJS import
import type { NextPage } from 'next'

// Component Import
import LoginForm from '@/components/login'

const Auth: NextPage = () => {

    return <div className='w-screen h-screen flex bg-bgColor justify-center items-center text-black'>
        <div className='w-[40rem] h-[20rem] bg-white rounded-lg shadow-lg flex flex-col items-center p-4 gap-y-4'>
            <span className='font-medium text-[1.5rem]'>Login</span>
            <LoginForm />
        </div >
    </div >
}

export default Auth