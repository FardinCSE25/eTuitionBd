import React, { useState } from "react";
import { useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBookOpen, 
  FaUserCheck, 
  FaCreditCard, 
  FaChartLine,
  FaArrowRight,
  FaChalkboardTeacher,
  FaTasks,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaFileContract,
  FaUserGraduate
} from "react-icons/fa";
import { FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const TutorHome = () => {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    const stats = [
        { 
            label: "Active Applications", 
            value: "8", 
            icon: <FaFileContract />, 
            change: "+3 new", 
            color: "from-blue-500 to-cyan-500" 
        },
        { 
            label: "Ongoing Tuitions", 
            value: "4", 
            icon: <FaTasks />, 
            change: "+1 this week", 
            color: "from-emerald-500 to-green-500" 
        },
        { 
            label: "Total Revenue", 
            value: "৳8,450", 
            icon: <FaMoneyBillWave />, 
            change: "+15%", 
            color: "from-purple-500 to-pink-500" 
        },
        { 
            label: "Success Rate", 
            value: "92%", 
            icon: <FiTrendingUp />, 
            change: "+4%", 
            color: "from-orange-500 to-red-500" 
        }
    ];

    const cards = [
        {
            id: 1,
            title: "My Applications",
            desc: "Track all your submitted tuition applications and their current statuses.",
            icon: <FaFileContract />,
            color: "from-blue-500 to-cyan-500",
            gradient: "bg-linear-to-br from-blue-50 to-cyan-50",
            stats: "8 Active",
            path: "/dashboard/my-applications"
        },
        {
            id: 2,
            title: "Ongoing Tuitions",
            desc: "View tuitions that have been approved and are currently ongoing.",
            icon: <FaTasks />,
            color: "from-emerald-500 to-green-500",
            gradient: "bg-linear-to-br from-emerald-50 to-green-50",
            stats: "4 Active",
            path: "/dashboard/ongoing-tuitions"
        },
        {
            id: 3,
            title: "Revenue History",
            desc: "Check your earnings, payments, and complete transaction history.",
            icon: <FaMoneyBillWave />,
            color: "from-purple-500 to-pink-500",
            gradient: "bg-linear-to-br from-purple-50 to-pink-50",
            stats: "৳8,450 Total",
            path: "/dashboard/revenue-history"
        },
        
    ];

    const handleCardClick = (path) => {
        if (path && path !== "#") {
            setTimeout(() => {
                navigate(path);
            }, 150);
        }
    };

    const handleCardKeyPress = (event, path) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(path);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            scale: 1.03,
            y: -10,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                type: "spring",
                stiffness: 400
            }
        }
    };

    const statCardVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400
            }
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
            <title>eTuitionBd - Tutor Dashboard</title>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-96 h-96 rounded-full bg-linear-to-r from-primary/5 to-secondary/5"
                        initial={{
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                            scale: 0
                        }}
                        animate={{
                            x: Math.random() * 100 - 50 + 'vw',
                            y: Math.random() * 100 - 50 + 'vh',
                            scale: [0, 1, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: 25 + i * 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary to-secondary shadow-2xl mb-8"
                >
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="relative p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-full bg-white/20">
                                        <FaChalkboardTeacher className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-white/90 text-sm font-medium">Tutor Dashboard</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    Welcome, <span className="bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">{user?.displayName}</span> 👨‍🏫
                                </h1>
                                <p className="text-white/90 max-w-2xl">
                                    Manage your applications, track ongoing tuitions, monitor revenue, and grow your teaching career.
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                                    <img
                                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                                        alt={user?.displayName}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={statCardVariants}
                            whileHover="hover"
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color} text-white shadow-md`}>
                                    <div className="text-2xl">
                                        {stat.icon}
                                    </div>
                                </div>
                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                            <motion.div
                                className="h-1 w-0 group-hover:w-full bg-linear-to-r from-transparent via-white to-transparent absolute bottom-0 left-0"
                                initial={false}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Teaching Hub</h2>
                            <p className="text-gray-600">Manage your tutoring activities and track progress</p>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => handleCardClick(card.path)}
                                    onKeyDown={(e) => handleCardKeyPress(e, card.path)}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Navigate to ${card.title}`}
                                    className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${card.path === '#' ? 'cursor-not-allowed opacity-80' : ''}`}
                                >
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                    
                                    {/* Hover Overlay */}
                                    <motion.div
                                        className={`absolute inset-0 bg-linear-to-r ${card.color}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    <div className={`relative bg-white p-6 rounded-2xl border border-gray-100 group-hover:border-transparent transition-all duration-300 ${card.path === '#' ? 'opacity-80' : ''}`}>
                                        {/* Icon */}
                                        <div className="flex items-center justify-between mb-6">
                                            <motion.div
                                                animate={{
                                                    scale: hoveredCard === index ? 1.2 : 1,
                                                    rotate: hoveredCard === index ? 5 : 0
                                                }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className={`p-4 rounded-xl bg-linear-to-r ${card.color} text-white shadow-lg`}
                                            >
                                                <div className="text-2xl">
                                                    {card.icon}
                                                </div>
                                            </motion.div>
                                            {card.path !== '#' && (
                                                <motion.div
                                                    animate={{
                                                        x: hoveredCard === index ? 5 : 0,
                                                        opacity: hoveredCard === index ? 1 : 0.5
                                                    }}
                                                >
                                                    <FaArrowRight className="text-gray-400 group-hover:text-primary text-xl" />
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {card.desc}
                                        </p>

                                        {/* Stats or Action */}
                                        <div className="flex items-center justify-between mt-4">
                                            {card.stats ? (
                                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                                                    {card.stats}
                                                </span>
                                            ) : (
                                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${card.path === '#' ? 'bg-gray-200 text-gray-500' : 'bg-linear-to-r from-primary/10 to-secondary/10 text-primary'}`}>
                                                    {card.action}
                                                </span>
                                            )}
                                            {card.path !== '#' && (
                                                <motion.div
                                                    className="h-1 w-8 bg-linear-to-r from-transparent via-primary to-transparent rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: hoveredCard === index ? "100%" : "2rem" }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Coming Soon Badge for inactive cards */}
                                    {card.path === '#' && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full">
                                            Coming Soon
                                        </div>
                                    )}

                                    {/* Click Animation Indicator */}
                                    {card.path !== '#' && (
                                        <motion.div
                                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0"
                                            initial={false}
                                            animate={{
                                                opacity: [0, 0.3, 0],
                                                x: ["-100%", "100%", "100%"]
                                            }}
                                            transition={{
                                                times: [0, 0.5, 1],
                                                duration: 0.6
                                            }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Performance Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-linear-to-r from-primary to-secondary">
                            <FaUserGraduate className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Tutor Performance Summary</h3>
                            <p className="text-gray-600">Overview of your teaching metrics and achievements</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                            <div className="text-3xl font-bold text-primary mb-2">24</div>
                            <div className="text-gray-600 text-sm">Total Applications</div>
                        </div>
                        <div className="text-center p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                            <div className="text-3xl font-bold text-emerald-500 mb-2">18</div>
                            <div className="text-gray-600 text-sm">Successful Tuitions</div>
                        </div>
                        <div className="text-center p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                            <div className="text-3xl font-bold text-amber-500 mb-2">4.8</div>
                            <div className="text-gray-600 text-sm">Average Rating</div>
                        </div>
                        <div className="text-center p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                            <div className="text-3xl font-bold text-purple-500 mb-2">92%</div>
                            <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TutorHome;