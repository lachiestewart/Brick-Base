import { useState } from 'react'
import SideBarItem from './SideBarItem'
import SideBarSearch from './SideBarSearch'
import SideBarDivider from './SideBarDivider'
import { AnalyticsUpIcon, Menu01Icon, Cancel01Icon, Folder01Icon } from 'hugeicons-react'


const NavBar = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)
  return (
    <div className={`h-screen ${open ? 'w-1/3' : 'w-min'} max-w-60 bg-red-500`}>
      {open ? <Cancel01Icon onClick={toggleOpen} className='cursor-pointer'/> : <Menu01Icon onClick={toggleOpen} className='cursor-pointer'/>}
      <SideBarSearch open={open} setOpen={setOpen} />
      <SideBarItem title='Dashboard' icon={<AnalyticsUpIcon className='w-7 h-7' />} to='/dashboard' open={open} />
      <SideBarItem title='Collection' icon={<Folder01Icon className='w-7 h-7' />} to='/collection' open={open} />
      <SideBarDivider />
    </div>
  )
}

export default NavBar