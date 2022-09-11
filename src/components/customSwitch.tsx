// React import
import { FunctionComponent } from "react";

// Dependencies import
import { Switch } from '@headlessui/react'

const CustomSwitch: FunctionComponent<{ checked: boolean, onChange: (value: boolean) => void }> = ({ checked, onChange }) => {

    return <Switch
        checked={checked}
        onChange={onChange}
        className={`${checked ? 'bg-black' : 'bg-gray-400'}
relative  inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-black focus-visible:ring-opacity-75`}
    >
        <span className="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            className={`${checked ? 'translate-x-[25px]' : 'translate-x-0'}
pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
    </Switch>

}

export default CustomSwitch