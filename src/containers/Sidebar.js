import { useSession } from 'next-auth/react'
import  {
    ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    UsersIcon
} from '@heroicons/react/outline'
import {
CalendarIcon,
ClockIcon,
DesktopComputerIcon,
UserIcon
} from '@heroicons/react/solid'
import SiderbarRow from '../components/SiderbarRow'

const Sidebar = () => {
    const {data: session} = useSession()
    console.log(session)


  return (
    <div className='p-2 mt-5 max-w-[600px] xl:min-w-[200px]'>
        <SiderbarRow src={session.user.image} title={session.user.name} />
        <SiderbarRow Icon={UserGroupIcon} title="Groups" />
        <SiderbarRow Icon={ShoppingBagIcon} title="MarketPlace" />
        <SiderbarRow Icon={DesktopComputerIcon} title="Watch" />
        <SiderbarRow Icon={CalendarIcon} title="Events" />
        <SiderbarRow Icon={ClockIcon} title="Memories" />
        <SiderbarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  )
}


export default Sidebar;