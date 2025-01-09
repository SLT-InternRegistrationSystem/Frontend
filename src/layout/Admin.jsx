import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminSidebar, { AdminSidebarItem } from '../components/Admin/AdminSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUserPlus, faUserGroup, faUserTie, faCalendarCheck, faFileLines } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../components/Admin/AdminNavbar';

const Admin = () => {
  const location = useLocation(); 
  const [navbarTitle, setNavbarTitle] = useState('Dashboard');

  const sidebarItems = [
    { path: '/admin', title: 'Dashboard', icon: faChartLine },
    { path: '/admin/new-applications', title: 'New Applications', icon: faUserPlus, alert: true },
    { path: '/admin/manage-interns', title: 'Manage Interns', icon: faUserGroup },
    { path: '/admin/manage-supervisors', title: 'Manage Supervisors', icon: faUserTie },
    { path: '/admin/attendance', title: 'Attendance', icon: faCalendarCheck },
    { path: '/admin/reports', title: 'Reports', icon: faFileLines },
  ];

  const handleSidebarItemClick = (title) => {
    setNavbarTitle(title);
  };

  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar>
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleSidebarItemClick(item.title)}
            >
              <AdminSidebarItem
                icon={<FontAwesomeIcon icon={item.icon} width={20} height={20} />}
                text={item.title}
                active={location.pathname === item.path} 
                alert={item.alert || false}
              />
            </Link>
          ))}
        </AdminSidebar>
      </div>
      <div className="flex-1">
        <AdminNavbar title={navbarTitle} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
