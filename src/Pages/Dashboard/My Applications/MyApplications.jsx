import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import {
    FaEdit,
    FaTrash,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaFileContract,
    FaUserGraduate,
    FaBook,
    FaMoneyBillWave
} from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import MyApplicationsLoading from '../../../Components/Loading/Dashboard/MyApplicationsLoading';

const MyApplications = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const modalRef = useRef(null);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ["my-applications", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/application?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <MyApplicationsLoading />;

    const getStatusIcon = (status) => {
        switch (status) {
            case "Approved": return <FaCheckCircle className="text-green-500" />;
            case "Rejected": return <FaTimesCircle className="text-red-500" />;
            default: return <FaClock className="text-yellow-500" />;
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case "Approved": return "bg-green-100 text-green-700 border-green-200";
            case "Rejected": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
        }
    };

    const stats = [
        {
            label: "Total Applications",
            value: applications.length,
            icon: <FaFileContract />,
            color: "from-blue-500 to-cyan-500"
        },
        {
            label: "Approved",
            value: applications.filter(app => app.applicationStatus === "Approved").length,
            icon: <FaCheckCircle />,
            color: "from-green-500 to-emerald-500"
        },
        {
            label: "Pending",
            value: applications.filter(app => app.applicationStatus === "Pending").length,
            icon: <FaClock />,
            color: "from-yellow-500 to-amber-500"
        },
        {
            label: "Success Rate",
            value: applications.length > 0
                ? `${Math.round((applications.filter(app => app.applicationStatus === "Approved").length / applications.length) * 100)}%`
                : "0%",
            icon: <FiTrendingUp />,
            color: "from-purple-500 to-pink-500"
        }
    ];

    const handleDelete = (id, studentName) => {
        Swal.fire({
            title: "Delete Application?",
            text: `Are you sure you want to delete your application for ${studentName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "Yes, Delete",
            background: '#f8fafc',
            color: '#1E293B',
            iconColor: '#dc2626',
            customClass: {
                popup: 'rounded-2xl border border-slate-200'
            }
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your application has been removed.",
                                icon: "success",
                                confirmButtonColor: "#3B82F6",
                                background: '#f8fafc',
                                color: '#1E293B',
                                iconColor: '#059669',
                                customClass: {
                                    popup: 'rounded-2xl border border-slate-200'
                                }
                            });
                        }
                    });
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedApplication = {
            qualification: form.qualification.value,
            experience: form.experience.value,
            salary: form.salary.value,
        };

        axiosSecure.patch(`/applications/${selectedApplication._id}/update`, updatedApplication)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        title: "Updated!",
                        text: "Application updated successfully!",
                        icon: "success",
                        confirmButtonColor: "#3B82F6",
                        background: '#f8fafc',
                        color: '#1E293B',
                        iconColor: '#059669',
                        customClass: {
                            popup: 'rounded-2xl border border-slate-200'
                        }
                    });
                }
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
            scale: 1.02,
            y: -5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 lg:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-primary to-primary/90 rounded-2xl mb-6 shadow-xl">
                        <FaFileContract className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        My Applications
                    </h1>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-lg font-semibold text-secondary">
                                Total Applications:
                                <span className="text-primary ml-2 font-bold text-xl">
                                    {applications.length}
                                </span>
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color} text-white shadow-md`}>
                                    <div className="text-2xl">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-slate-800">
                                    {stat.value}
                                </div>
                            </div>
                            <div className="text-slate-600 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Applications Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-secondary">Applications List</h2>
                            <div className="text-sm text-slate-500">
                                Showing {applications.length} applications
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-linear-to-r from-primary to-primary/90">
                                    <tr>
                                        {["#", "Student", "Subject", "Class", "Status", "Applied", "Actions"].map((header, idx) => (
                                            <th
                                                key={idx}
                                                className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    <AnimatePresence>
                                        {applications.map((app, index) => (
                                            <motion.tr
                                                key={app._id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                whileHover={{
                                                    scale: 1.01,
                                                    backgroundColor: "rgba(59, 130, 246, 0.03)"
                                                }}
                                                className="group hover:bg-primary/5 transition-all duration-200"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                                            <span className="text-lg font-bold text-primary">{index + 1}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md">
                                                            {app.studentName?.charAt(0) || 'S'}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-secondary">
                                                                {app.studentName}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                {app.studentEmail}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <FaBook className="text-primary/70" />
                                                        <span className="text-sm font-semibold text-secondary">
                                                            {app.subject}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-secondary">
                                                        {app.class}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(app.applicationStatus)}
                                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBg(app.applicationStatus)}`}>
                                                            {app.applicationStatus}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-slate-600">
                                                        {formatDate(app.applied_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {app.applicationStatus === "Pending" && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => {
                                                                    setSelectedApplication(app);
                                                                    modalRef.current.showModal();
                                                                }}
                                                                className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                                title="Edit Application"
                                                            >
                                                                <FaEdit className="w-4 h-4" />
                                                            </motion.button>
                                                        )}

                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleDelete(app._id, app.studentName)}
                                                            className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                            title="Delete Application"
                                                        >
                                                            <FaTrash className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {applications.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaFileContract className="text-4xl text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-secondary mb-2">
                                    No Applications Found
                                </h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    You haven't applied to any tuitions yet. Start applying to see your applications here.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Update Modal */}
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box p-0 max-w-2xl overflow-hidden bg-white rounded-3xl border border-slate-200">
                        <div className="bg-linear-to-r from-primary to-primary/90 p-8">
                            <h3 className="text-2xl font-bold text-white">Update Application</h3>
                            <p className="text-blue-50/90 mt-1">Make changes to your application details</p>
                        </div>

                        {selectedApplication && (
                            <form onSubmit={handleUpdate} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <FaUserGraduate className="text-primary" />
                                                Tutor Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={selectedApplication.tutorName}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <FaUserGraduate className="text-primary" />
                                                Tutor Email
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            defaultValue={selectedApplication.tutorEmail}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <FaBook className="text-primary" />
                                                Qualification
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            defaultValue={selectedApplication.tutorQualification}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                            placeholder="Enter your qualification"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <FaBook className="text-primary" />
                                                Experience
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="experience"
                                            defaultValue={selectedApplication.tutorExperience}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                            placeholder="Enter your experience"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <FaMoneyBillWave className="text-primary" />
                                                Expected Salary
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="salary"
                                            defaultValue={selectedApplication.tutorExpectedSalary}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                            placeholder="Enter expected salary"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <FaFileContract className="text-primary" />
                                                Current Status
                                            </span>
                                        </label>
                                        <div className={`px-3 py-2 rounded-lg border ${getStatusBg(selectedApplication.applicationStatus)}`}>
                                            {selectedApplication.applicationStatus}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        className="btn flex-1 bg-primary border-none text-white hover:bg-primary/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <FaEdit className="mr-2" />
                                        Update Application
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => modalRef.current.close()}
                                        className="btn btn-outline border-slate-300 text-secondary hover:bg-slate-50 hover:border-primary/50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <button
                            className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white border-none"
                            onClick={() => modalRef.current.close()}
                        >
                            ✕
                        </button>
                    </div>

                    <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default MyApplications;