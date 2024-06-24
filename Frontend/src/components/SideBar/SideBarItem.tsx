import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type SideBarItemProps = {
    title: string
    icon: ReactNode
    to: string
    open: boolean
}

const SideBarItem = (props: SideBarItemProps) => {
    const navigate = useNavigate()
    const selected = useLocation().pathname === props.to
    const handleClick = () => navigate(props.to)
    return (
        <div className='w-full flex flex-row h-min items-center'>
            {selected && <div className='h-4 w-1 bg-black rounded-r-xl' />}
            <div className='w-full flex flex-row justify-start gap-5 select-none cursor-pointer' onClick={handleClick}>
                {props.icon}
                {props.open && <p className='hover:underline'>
                    {props.title}
                </p>}
            </div>
        </ div>
    )
}

export default SideBarItem