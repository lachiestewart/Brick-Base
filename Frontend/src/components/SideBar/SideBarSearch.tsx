import { Search01Icon } from 'hugeicons-react'

type SideBarSearchProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

const SideBarSearch = (props: SideBarSearchProps) => {
    return (
        <label
            htmlFor='sidebar-searchbox'
            className='flex flex-row gap-5 bg-slate-50 rounded-sm'
        >
            <Search01Icon
                onClick={() => props.setOpen(true)}
                className='cursor-pointer w-7 h-7'
            />
            {props.open &&
                <input
                    id='sidebar-searchbox'
                    type='text'
                    autoComplete='off'
                    placeholder='Search...'
                    className='bg-transparent outline-none select-none'
                />
            }
        </label>
    )
}

export default SideBarSearch