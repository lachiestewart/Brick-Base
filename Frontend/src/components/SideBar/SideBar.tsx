import { useState } from 'react'
import SideBarItem from './SideBarItem'
import SideBarSearch from './SideBarSearch'
import SideBarDivider from './SideBarDivider'
import { AnalyticsUpIcon, Menu01Icon, Cancel01Icon, Folder01Icon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'


const SideBar = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)

  const navigate = useNavigate();

  const handleClick = () => navigate('/')

  return (
    <div className={`h-full ${open ? 'w-1/3' : 'w-min'} max-w-60 bg-red-500 flex flex-col items-center sticky`}>

      <div className='w-full flex flex-row flex-wrap cursor-pointer' onClick={handleClick}>
        <div className={open ? 'w-14' : 'w-full'}>
          <img src='/icon.svg' alt='logo' className='bg-cover' />
        </div>
        {open && <h1 className='text-2xl text-center ml-2'>Brick Base</h1>}
      </div>

      {open ? <Cancel01Icon onClick={toggleOpen} className='cursor-pointer h-10' /> : <Menu01Icon onClick={toggleOpen} className='cursor-pointer h-10' />}
      <SideBarSearch open={open} setOpen={setOpen} />
      <SideBarItem title='Dashboard' icon={AnalyticsUpIcon} to='/dashboard' open={open} />
      <SideBarItem title='Collection' icon={Folder01Icon} to='/collections' open={open} />
      <SideBarDivider />
    </div>
  )
}

export { SideBar }