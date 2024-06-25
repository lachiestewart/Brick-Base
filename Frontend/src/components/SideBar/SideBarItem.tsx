import { HugeiconsProps } from 'hugeicons-react'
import { FC, RefAttributes } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type SideBarItemProps = {
    title: string
    icon: FC<Omit<HugeiconsProps, "ref"> & RefAttributes<SVGSVGElement>>
    to: string
    open: boolean
}

const SideBarItem = (props: SideBarItemProps) => {
    const navigate = useNavigate()
    const selected = useLocation().pathname === props.to
    const handleClick = () => navigate(props.to)
    return (
        <div className='w-full flex flex-row h-10 items-center gap-3'>
            <div className={`h-7 w-1 ${selected ? 'bg-black' : 'bg-transparent'} rounded-r-xl`} />
            <div className='w-full flex flex-row justify-start gap-3 select-none cursor-pointer' onClick={handleClick}>
                {<props.icon className={`w-7 h-7 ${props.open ? '' : 'mr-3'}`} />}
                {props.title && props.open &&
                    <p className={selected ? 'underline' : 'hover:underline'}>
                        {props.title}
                    </p>
                }
            </div>
        </ div>
    )
}

export default SideBarItem