import React, { useEffect, useState } from 'react';
import {
    CiBookmark,
    CiViewList,
    CiSettings,
    CiHome
} from 'react-icons/ci';
import {
    FaMoneyCheckAlt,
    FaPlusCircle,
    FaUserCheck,
    FaUsersCog,
    FaWpforms,
    FaChartLine,
    FaBell,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
    FaUser
} from 'react-icons/fa';
import { Link, Outlet, useLocation } from 'react-router';
import useRole from '../Hooks/UseRole';
import {
    RiBarChart2Line,
    RiMoneyDollarCircleFill,
    RiLogoutBoxRLine
} from 'react-icons/ri';
import { SiTask } from 'react-icons/si';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import UseAuth from '../Hooks/UseAuth';
import Logo from '../Components/Logo/Logo';

const DashboardLayout = () => {
    const { role } = useRole();
    const { user } = UseAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    console.log(user);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => {
        if (isMobile) setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section */}
                        <div className="flex items-center">
                            {/* Sidebar Toggle Button */}
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mr-4 lg:mr-6"
                            >
                                {isOpen ? (
                                    <FaChevronLeft className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <FaChevronRight className="w-5 h-5 text-gray-600" />
                                )}
                            </button>

                            {/* Logo/Brand */}
                            <div className="flex items-center gap-3">
                                <Link to="/" className="p-2 rounded-xl">
                                    <Logo />
                                </Link>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">

                            {/* User Profile */}
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-800">{user.displayName}</p>
                                    <p className="text-xs text-gray-500 capitalize">{role?.role || 'Student'}</p>
                                </div>
                                <div className="relative">
                                    <img src={user.photoURL || "https://placehold.co/40x40"} alt="User Profile" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    sticky lg:relative min-h-screen max-h-[2400px] bg-white border-r border-gray-200 
                    transition-all duration-300 ease-in-out z-40
                    ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
                    ${isMobile && !isOpen ? '-translate-x-full' : ''}
                `}>
                    {/* Sidebar Content */}
                    <div className="h-full flex flex-col">
                        {/* User Profile Card */}
                        <div className={`
                            p-4 border-b border-gray-200 transition-all duration-300
                            ${!isOpen ? 'px-3' : ''}
                        `}>
                            <div className={`flex items-center ${!isOpen ? 'justify-center' : 'gap-3'}`}>
                                <div className="relative">
                                    <div className="w-12 h-12 bg-linear-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            <img src={user.photoURL || "https://placehold.co/40x40"} alt="User Profile" className="w-full h-full rounded-xl object-cover" />
                                        </span>
                                    </div>
                                </div>
                                {isOpen && (
                                    <div>
                                        <p className="font-semibold text-gray-800">{user.displayName}</p>
                                        <p className="text-xs text-gray-500 capitalize">{role?.role || 'User'}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex-1 px-3 py-6 overflow-y-auto">
                            <ul className="space-y-2">
                                {/* Dashboard Home */}
                                <NavItem
                                    to="/"
                                    label="Homepage"
                                    icon={<CiHome className="w-5 h-5" />}
                                    isOpen={isOpen}
                                    isActive={isActive('/')}
                                />

                                {/* Student Routes */}
                                {role?.role === "Student" && (
                                    <>
                                        <NavItem
                                            to="/dashboard/my-tuitions"
                                            label="My Tuitions"
                                            icon={<CiBookmark className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/my-tuitions')}
                                        />
                                        <NavItem
                                            to="/dashboard/post-new-tuition"
                                            label="Post New Tuition"
                                            icon={<FaPlusCircle className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/post-new-tuition')}
                                        />
                                        <NavItem
                                            to="/dashboard/applied-tutors"
                                            label="Applied Tutors"
                                            icon={<FaUserCheck className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/applied-tutors')}
                                        />
                                        <NavItem
                                            to="/dashboard/payment-history"
                                            label="Payment History"
                                            icon={<FaMoneyCheckAlt className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/payment-history')}
                                        />
                                        <NavItem
                                            to="/dashboard/profile-settings"
                                            label="Profile Settings"
                                            icon={<CiSettings className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/profile-settings')}
                                        />
                                    </>
                                )}

                                {/* Tutor Routes */}
                                {role?.role === "Tutor" && (
                                    <>
                                        <NavItem
                                            to="/dashboard/my-applications"
                                            label="My Applications"
                                            icon={<FaWpforms className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/my-applications')}
                                        />
                                        <NavItem
                                            to="/dashboard/ongoing-tuitions"
                                            label="Ongoing Tuitions"
                                            icon={<SiTask className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/ongoing-tuitions')}
                                        />
                                        <NavItem
                                            to="/dashboard/revenue-history"
                                            label="Revenue History"
                                            icon={<RiMoneyDollarCircleFill className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/revenue-history')}
                                        />
                                    </>
                                )}

                                {/* Admin Routes */}
                                {role?.role === "Admin" && (
                                    <>
                                        <NavItem
                                            to="/dashboard/manage-users"
                                            label="User Management"
                                            icon={<FaUsersCog className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/manage-users')}
                                        />
                                        <NavItem
                                            to="/dashboard/manage-tuitions"
                                            label="Tuition Management"
                                            icon={<CiViewList className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/manage-tuitions')}
                                        />
                                        <NavItem
                                            to="/dashboard/reports-analytics"
                                            label="Reports & Analytics"
                                            icon={<RiBarChart2Line className="w-5 h-5" />}
                                            isOpen={isOpen}
                                            isActive={isActive('/dashboard/reports-analytics')}
                                        />
                                    </>
                                )}

                            </ul>
                        </nav>

                        {/* Sidebar Footer */}
                        {isOpen && (
                            <div className="p-4 border-t border-gray-200">
                                <div className="text-xs text-gray-500 text-center">
                                    <p>eTuitionBd Dashboard</p>
                                    <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`
                    flex-1 p-4 lg:p-6 transition-all duration-300
                    ${isOpen && "lg:-ml-50"}
                `}>
                    {/* Mobile Overlay */}
                    {isMobile && isOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                            onClick={closeSidebar}
                        />
                    )}

                    {/* Page Content */}
                    <div className="max-w-7xl sticky mx-auto">
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary">
                                            <CiHome className="w-4 h-4 mr-2" />
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <span className="mx-2 text-gray-400">/</span>
                                            <span className="text-sm font-medium text-primary capitalize">
                                                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                                            </span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* Page Content Area */}
                        <div className="bg-white rounded-2xl w-[1500px] shadow-sm border border-gray-200 p-6">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

/* Navigation Item Component */
const NavItem = ({ to, label, icon, isOpen, isActive }) => {
    return (
        <li>
            <Link
                to={to}
                className={`
                    flex items-center gap-3 p-3 rounded-xl 
                    transition-all duration-200 relative
                    ${isOpen ? 'justify-start' : 'justify-center'}
                    ${isActive
                        ? 'bg-linear-to-r from-primary/10 to-secondary/10 text-primary border-l-4 border-primary'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-white'
                    }
                    group
                `}
            >
                {/* Icon */}
                <div className={`
                    transition-all duration-200
                    ${isActive ? 'text-primary scale-110 hover:text-white' : 'group-hover:scale-110 hover:text-gray-200'}
                `}>
                    {icon}
                </div>

                {/* Label */}
                {isOpen && (
                    <span className={`font-medium ${isActive ? 'font-semibold hover:text-white' : ''}`}>
                        {label}
                    </span>
                )}

                {/* Active Indicator Dot for collapsed state */}
                {!isOpen && isActive && (
                    <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-primary rounded-full -translate-y-1/2"></div>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {label}
                    </div>
                )}
            </Link>
        </li>
    );
};

export default DashboardLayout;