import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import Logo from '../../Components/Logo/Logo';
import "./navbar.css";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaHome, FaBook, FaChalkboardTeacher, FaInfoCircle, FaTachometerAlt } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import UseRole from '../../Hooks/UseRole';
import Loading from '../../Components/Loading/Loading';

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const { role, isLoading } = UseRole();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    console.log(role);

    if (isLoading) {
        return <Loading />
    }

    const handleLogout = () => {
        logOut()
            .catch(error => {
                console.log(error)
            });
    }

    const navLinks = [
        { path: "/", label: "Home", icon: <FaHome /> },
        { path: "/tuitions", label: "Tuitions", icon: <FaBook /> },
        { path: "/tutors", label: "Tutors", icon: <FaChalkboardTeacher /> },
        { path: "/about", label: "About", icon: <FaInfoCircle /> },
    ];

    const userLinks = [
        { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg mb-20 border-b border-slate-200 shadow-sm"
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Logo />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                                        ? 'bg-linear-to-r from-primary/10 to-primary/5 text-primary border border-primary/20'
                                        : 'text-secondary hover:text-primary hover:bg-slate-50'
                                    }`
                                }
                            >

                                <span>{link.label}</span>
                            </NavLink>
                        ))}

                        {user && userLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                                        ? 'bg-linear-to-r from-primary/10 to-primary/5 text-primary border border-primary/20'
                                        : 'text-secondary hover:text-primary hover:bg-slate-50'
                                    }`
                                }
                            >
                                <span>{link.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* User Actions - Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <>
                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300 group"
                                    >
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-all duration-300">
                                                <img
                                                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                    alt={user.displayName}
                                                    className="w-full h-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-secondary text-sm">{user.displayName}</p>
                                            <p className="text-xs text-slate-500 truncate max-w-[120px]">{user.email}</p>
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileOpen(false)}
                                            />
                                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden">
                                                <div className="px-4 py-3 border-b border-slate-100">
                                                    <p className="font-semibold text-secondary">{user.displayName}</p>
                                                    <p className="text-sm text-slate-500 truncate">{user.email}</p>
                                                </div>
                                                {
                                                    role?.role === "Student" && (
                                                        <Link
                                                            to="/dashboard/profile-settings"
                                                            className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors duration-200"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <FaUser className="text-primary" />
                                                            <span className="text-secondary">My Profile</span>
                                                        </Link>
                                                    )
                                                }
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-200"
                                                >
                                                    <FaSignOutAlt />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-secondary hover:text-primary hover:bg-slate-50 transition-all duration-300 border border-slate-200 hover:border-primary/30"
                                >
                                    <FaSignInAlt />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium bg-linear-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <FaUserPlus />
                                    <span>Register</span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isProfileOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsProfileOpen(false)}>
                        <div
                            className="absolute top-16 right-0 left-0 bg-white border-t border-slate-200 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-4 pt-4 pb-6">
                                {/* User Info */}
                                {user && (
                                    <div className="flex items-center space-x-3 mb-6 p-3 bg-linear-to-r from-primary/5 to-primary/10 rounded-xl">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="w-full h-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-secondary">{user.displayName}</p>
                                            <p className="text-sm text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Links */}
                                <div className="space-y-2 mb-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <span className="text-primary">{link.icon}</span>
                                            <span className="text-secondary font-medium">{link.label}</span>
                                        </Link>
                                    ))}

                                    {user && userLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <span className="text-primary">{link.icon}</span>
                                            <span className="text-secondary font-medium">{link.label}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Auth Buttons */}
                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    {user ? (
                                        <>
                                            {
                                                role?.role === "Student" && (
                                                    <Link
                                                        to="/dashboard/profile-settings"
                                                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl font-medium bg-slate-100 text-secondary hover:bg-slate-200 transition-colors duration-200"
                                                        onClick={() => setIsProfileOpen(false)}
                                                    >
                                                        <FaUser />
                                                        <span>My Profile</span>
                                                    </Link>
                                                )
                                            }
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl font-medium bg-linear-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                <FaSignOutAlt />
                                                <span>Logout</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl font-medium text-secondary hover:bg-slate-50 transition-colors duration-200 border border-slate-200"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <FaSignInAlt />
                                                <span>Login</span>
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl font-medium bg-linear-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <FaUserPlus />
                                                <span>Create Account</span>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;