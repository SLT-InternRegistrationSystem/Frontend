import React from 'react'
import {Button} from "@nextui-org/react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-8">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a href='/'>Add Intern</a></li>
                <li><a href='/interns'>Intern List</a></li>
            </ul>
            </div>
            <a href='/'><img src="logo.png" className='w-36' alt="logo" /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-bold text-gray-600">
            <li><a href='/'>Add Intern</a></li>
            <li><a href='/interns'>Intern List</a></li>
            </ul>
        </div>
        <div className="navbar-end">
            <a href="/login"><Button className="bg-blue font-bold text-white">Log in</Button></a>
        </div>
    </div>
  )
}

export default Navbar