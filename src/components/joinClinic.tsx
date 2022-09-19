// NextJS import
import { useRouter } from 'next/router';

// React import 
import { useEffect, useState } from 'react'

// Dependencies import
import { Combobox } from '@headlessui/react'
import { search } from '@/api/search/search';
import { Clinic } from '@/types/vet';
import { joinClinic } from '@/api/clinic/clinic';
import { toast } from 'react-toastify';


const JoinClinic = () => {
    // Local state
    const [selectedClinic, setSelectedClinic] = useState<string | Clinic>("")
    const [clinics, setClinics] = useState([]);
    const [query, setQuery] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


    // Use Effects
    useEffect(() => {


        (async () => {
            if (query === "") return setClinics([])

            const result = await search(query)

            setClinics(result?.data?.filteredClinics)

        })()
    }, [query])

    // Router
    const router = useRouter();

    let timeOut: NodeJS.Timeout;

    const handleSearch = (value: string) => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            setQuery(value)
        }, 500)
    }


    const submit = async () => {
        setIsSubmitting(true)

        try {

            const result = await joinClinic((selectedClinic as Clinic).id)


            if (result!.status === 200) {
                toast.success("Joined clinic successfully")
                router.push("/onboarding/approval")
            }

            setIsSubmitting(false)


        } catch (e) {
            console.log(e)

        }
    }


    return <div className='w-[20rem] b self-center'>
        <Combobox value={selectedClinic} onChange={setSelectedClinic}>
            <Combobox.Input onChange={(event) => handleSearch(event.target.value)} className="w-full bg-white border-gray-400 border-2 rounded-lg outline-none p-2 text-black" placeholder='Seach Clinic' />
            <Combobox.Options className="bg-white text-black shadow-lg p-2">
                {clinics.map((clinic: any) => (
                    <Combobox.Option className="cursor-pointer hover:bg-gray-400/30" key={clinic.id} value={clinic}>
                        {clinic.name}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>

        <div className='mb-6' />

        {

            selectedClinic !== "" &&
            <div className='text-black'>
                <span className='font-medium'>{(selectedClinic as Clinic).name}</span>
                <div className='flex'>
                    <span className='text-sm'>{(selectedClinic as Clinic).address}, </span>
                    <span className='text-sm'>{(selectedClinic as Clinic).city}, </span>
                    <span className='text-sm'>{(selectedClinic as Clinic).country}.</span>
                </div>

                <span>
                    <span className='text-sm'>Phone: </span>
                    <span className='text-sm'>{(selectedClinic as Clinic).phone_number}</span>
                </span>
            </div>
        }

        <button onClick={submit} disabled={selectedClinic === ""} className={`w-[20rem] bg-black rounded-lg p-2 mt-2 ${selectedClinic === "" && "bg-gray-400 cursor-not-allowed"}`}>
            {isSubmitting ? "Joining..." : "Join Clinic"}
        </button>

    </div>

}

export default JoinClinic