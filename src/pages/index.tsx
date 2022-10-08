import { getProfile } from '@/api/profile/proifle'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'




const Home: NextPage = () => {

  const router = useRouter()


  const handleRouting = async () => {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")
    if (!token || !user_id || token === "" || user_id === "")
      return router.push("/auth")

    const profile = await getProfile()


    if (profile?.vetProfile.profile_complete && profile.vetProfile.is_approved) return router.replace("/dashboard")

    if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length == 0) return router.replace("/onboarding/clinic")
    if (profile?.vetProfile.profile_complete && profile?.vetProfile?.clinics?.length > 0) return router.replace("/onboarding/clinic")


    if (!profile?.vetProfile.profile_complete) return router.replace("/onboarding")


  }

  return (
    <div className='bg-bgColor text-black flex w-screen flex-col h-screen'>

      <Head>
        <title>TonVeto</title>
      </Head>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl px-4 md:px-6 py-2.5' style={{ background: "linear-gradient(103deg, rgba(69, 198, 254, 1), rgb(110 123 245));" }}>
          <div className='flex items-center'>

            <Image src="/icon.png" alt='h' width={35} height={35} />
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>TonVeto</span>
          </div>
          <div className='flex items-center'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition delay-150 duration-300 ease-in-out' style={{ background: "#715fe3;" }} onClick={() => {
              handleRouting()
            }}>Connexion / Inscription</button>
          </div>
        </div>
      </nav>
      <div className='flex flex-col w-full h-full items-center justify-center gap-y-10' style={{ background: "linear-gradient(165deg, rgba(69, 198, 254, 1), rgba(147, 18, 207, 1))" }} >

        <div className="pt-21">

          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">

            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">


              <h1 className="my-4 text-5xl font-bold leading-tight" style={{ fontSize: "34px" }}>Trouver le meilleur vétérinaire n&apos;a jamais été aussi facile.</h1>

              <p className="leading-normal text-2xl mb-4" style={{ fontSize: "14px" }}>Vous êtes à la recherche d&apos;un vétérinaire ? N&apos;attendez plus et téléchargez notre application depuis le Google Playstore. </p>


              <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a href="https://play.google.com/store/apps/details?id=com.tonveto.tonvetoapp" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <linearGradient id="a" gradientUnits="userSpaceOnUse" x2="261.746" y1="112.094" y2="112.094"><stop offset="0" stopColor="#63be6b" /><stop offset=".506" stopColor="#5bbc6a" /><stop offset="1" stopColor="#4ab96a" /></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1=".152" x2="179.896" y1="223.393" y2="223.393"><stop offset="0" stopColor="#3ec6f2" /><stop offset="1" stopColor="#45afe3" /></linearGradient><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="179.896" x2="407.976" y1="229.464" y2="229.464"><stop offset="0" stopColor="#faa51a" /><stop offset=".387" stopColor="#fab716" /><stop offset=".741" stopColor="#fac412" /><stop offset="1" stopColor="#fac80f" /></linearGradient><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="1.744" x2="272.296" y1="345.521" y2="345.521"><stop offset="0" stopColor="#ec3b50" /><stop offset="1" stopColor="#e7515b" /></linearGradient><path d="M261.7 142.3L15 1.3C11.9-.5 8-.4 5 1.4c-3.1 1.8-5 5-5 8.6 0 0 .1 13 .2 34.4l179.7 179.7z" fill="url(#a)" /><path d="M.2 44.4C.5 121.6 1.4 309 1.8 402.3L180 224.1z" fill="url(#b)" /><path d="M402.9 223l-141.2-80.7-81.9 81.8 92.4 92.4L403 240.3c3.1-1.8 5-5.1 5-8.6 0-3.6-2-6.9-5.1-8.7z" fill="url(#c)" /><path d="M1.7 402.3c.2 33.3.3 54.6.3 54.6 0 3.6 1.9 6.9 5 8.6 3.1 1.8 6.9 1.8 10 0l255.3-148.9-92.4-92.4z" fill="url(#d)" /></svg>
                  <div className="text-left">

                    <div className="mb-1 text-xs">Tonveto</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">pour Android</div>
                  </div>
                </a>

              </div>


              <p className="mt-3 leading-normal text-2xl mb-3" style={{ fontSize: "14px" }}>Vous êtes admin tonveto ? téléchargez l&apos;application de bureau pour macOS et Windows.</p>


              <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                <a href="https://drive.google.com/uc?export=download&id=1XLjtDmcUkAN7T0H8tMNjQ5XeEJcZuP8w" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                  <div className="text-left">

                    <div className="mb-1 text-xs">tonveto</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">pour macOS</div>
                  </div>
                </a>
                <a href="https://drive.google.com/uc?export=download&id=1LAp25jRg_UYrQTVYJmigPkugFoVs70vi" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                  <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 2499.6 2500" viewBox="0 0 2499.6 2500"><path d="m1187.9 1187.9h-1187.9v-1187.9h1187.9z" fill="#f1511b" /><path d="m2499.6 1187.9h-1188v-1187.9h1187.9v1187.9z" fill="#80cc28" /><path d="m1187.9 2500h-1187.9v-1187.9h1187.9z" fill="#00adef" /><path d="m2499.6 2500h-1188v-1187.9h1187.9v1187.9z" fill="#fbbc09" /></svg></svg>
                  <div className="text-left">
                    <div className="mb-1 text-xs">tonveto</div>
                    <div className="-mt-1 font-sans text-sm font-semibold">pour Windows</div>
                  </div>
                </a>

              </div>
            </div>

            <div className="w-full md:w-3/5 py-6 text-center">
              <Image src="/doc.png" alt='h' width={440}
                height={406} style={{ width: "auto", height: "40px" }} />
            </div>

          </div>

        </div>

        <div className='flex space-x-72 w-full'>

          <span className="block text-sm text-gray-500 sm:text-right w-7/12 dark:text-white-400 " style={{ color: "white" }}>Tonveto © 2022.
          </span>
          <span className="block text-sm text-gray-500 sm:text-right w-1/12 float-right place-items-end dark:text-white-400 " > <a href="privacy-policy" className="hover:underline" style={{ color: "white", fontWeight: "700" }}>CGU</a>
          </span>
        </div>
      </div>

    </div>
  )
}

export default Home
