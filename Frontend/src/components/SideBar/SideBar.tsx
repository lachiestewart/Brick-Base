import { useState } from 'react'
import SideBarItem from './SideBarItem'
import SideBarSearch from './SideBarSearch'
import SideBarDivider from './SideBarDivider'
import { AnalyticsUpIcon, Menu01Icon, Cancel01Icon, Folder01Icon } from 'hugeicons-react'


const NavBar = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)
  return (
    <div className={`h-screen ${open ? 'w-1/3' : 'w-min'} max-w-60 bg-red-500 flex flex-col items-center`}>
      
      <div className='w-full flex flex-row flex-wrap'>
        <div className={open ? 'w-14' : 'w-full'}>
          <img src='/icon.svg' alt='logo' className='bg-cover' />
        </div>
        {open && <h1 className='text-2xl text-center ml-2'>Brick Base</h1>}
      </div>

      {open ? <Cancel01Icon onClick={toggleOpen} className='cursor-pointer h-10' /> : <Menu01Icon onClick={toggleOpen} className='cursor-pointer h-10' />}
      <SideBarSearch open={open} setOpen={setOpen} />
      <SideBarItem title='Dashboard' icon={AnalyticsUpIcon} to='/dashboard' open={open} />
      <SideBarItem title='Collection' icon={Folder01Icon} to='/collection' open={open} />
      <SideBarDivider />
    </div>
  )
}

export default NavBar