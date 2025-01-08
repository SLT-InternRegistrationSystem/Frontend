import React from 'react'
import AdminSidebar, { AdminSidebarItem } from '../components/Admin/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import { faFileLines} from '@fortawesome/free-solid-svg-icons';
import { MdDashboard } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { FaRegCalendarCheck } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex'>
        <AdminSidebar>
          <AdminSidebarItem icon={<FontAwesomeIcon icon={faChartLine} width={20} height={20} />} text="Dashboard" active/>
          <AdminSidebarItem icon={<FontAwesomeIcon icon={faUserPlus} width={20} height={20} />} text="New Applications" alert/>
          <AdminSidebarItem icon={<FontAwesomeIcon icon={faUserGroup} width={20} height={20} />} text="Manage Interns" />
          <AdminSidebarItem icon={<FontAwesomeIcon icon={faUserTie} width={20} height={20}/>} text="Manage Supervisors" />
          <AdminSidebarItem icon={<FontAwesomeIcon icon={faCalendarCheck} width={20} height={20}/>} text="Attendance" />
          <AdminSidebarItem icon={<FontAwesomeIcon icon={faFileLines} width={20} height={20}/>} text="Reports" />
        </AdminSidebar>
        <Outlet/>
    </div>
  )
}

export default Admin