import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'




const Home: NextPage = () => {

  const router = useRouter()

  return (
    <div className='bg-bgColor text-black flex w-screen flex-col h-screen'>

      <Head>
        <title>TonVeto</title>
      </Head>

      <div className='flex h-[5rem] w-full bg-white items-center p-5 justify-between'>
        <span className='text-lg font-medium'>TonVeto</span>
        <button className='p-2 rounded-lg bg-black text-white' onClick={() => {
          router.push('/auth')
        }}>Get Started</button>
      </div>

      <div className='flex flex-col w-full h-full items-center justify-center gap-y-10'>
        <span className='text-xl font-medium'>Get started using TonVeto</span>
        <div className='flex w-full items-center justify-between px-28'>
          <a href="https://drive.google.com/uc?export=download&id=1LAp25jRg_UYrQTVYJmigPkugFoVs70vi" target="_blank" className='w-[15rem] h-[5rem] relative' rel="noreferrer">
            <Image src="/win.png" layout='fill' alt="Download on Windows" className='object-cover' />
          </a>

          <a href="https://drive.google.com/uc?export=download&id=1XLjtDmcUkAN7T0H8tMNjQ5XeEJcZuP8w" target="_blank"  className='w-[15rem] h-[5rem] relative' rel="noreferrer">
            <Image src="/mac.png" layout='fill' alt="Download on Windows" className='object-cover' />
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.tonveto.tonvetoapp" target="_blank" className='w-[15rem] h-[5rem] relative' rel="noreferrer">
            <Image src="/google.png" layout='fill' alt="Download on Windows" className='object-cover' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
