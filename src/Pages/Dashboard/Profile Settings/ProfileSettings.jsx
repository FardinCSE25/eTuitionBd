import React, { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCamera, FaUserEdit, FaSave, FaTimes, FaUpload } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import axios from "axios";
import { useNavigate } from "react-router";
import ProfileSettingsLoading from "../../../Components/Loading/Dashboard/ProfileSettingsLoading";

const ProfileSettings = () => {
    const { user, updateUserProfile } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <ProfileSettingsLoading />;

    const p = profile[0];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const form = e.target;
        const photo = form.photo.files[0];

        // Check if a new photo was uploaded
        if (photo) {
            const formData = new FormData();
            formData.append('image', photo);
            const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`;

            axios.post(photo_API_URL, formData)
                .then(result => {
                    const photoURL = result.data.data.display_url;
                    updateProfileData(form, photoURL);
                })
                .catch(err => {
                    console.error("Image upload error:", err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to upload image. Please try again.",
                        icon: "error",
                        confirmButtonColor: "#3B82F6",
                    });
                    setIsUpdating(false);
                });
        } else {
            // Use existing photo URL if no new photo was uploaded
            updateProfileData(form, p.photoURL);
        }
    };

    const updateProfileData = (form, photoURL) => {
        const updatedProfile = {
            name: form.name.value,
            photoURL: photoURL,
        };

        axiosSecure
            .patch(`/users?email=${user?.email}`, updatedProfile)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    const userProfile = {
                        displayName: form.name.value,
                        photoURL: photoURL
                    };

                    updateUserProfile(userProfile)
                        .then(() => {
                            refetch();
                            modalRef.current.close();
                            setIsUpdating(false);
                            Swal.fire({
                                title: "🎉 Profile Updated!",
                                text: "Your profile has been successfully updated.",
                                icon: "success",
                                confirmButtonColor: "#3B82F6",
                                background: '#f8fafc',
                                customClass: {
                                    popup: 'rounded-2xl border border-slate-200'
                                }
                            });
                            navigate(location.state || '/');
                        })
                        .catch((err) => {
                            console.error("Profile update error:", err);
                            setIsUpdating(false);
                        });
                }
            })
            .catch((err) => {
                console.error("API update error:", err);
                setIsUpdating(false);
            });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 lg:py-24 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-primary to-primary/90 rounded-2xl mb-6 shadow-xl">
                        <RiUserSettingsFill className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Profile Settings
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Manage your account information and preferences
                    </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    {/* Profile Header */}
                    <div className="bg-linear-to-r from-primary via-primary/90 to-primary p-8 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10 text-center">
                            <div className="relative inline-block">
                                <div className="relative w-40 h-40 mx-auto mb-6">
                                    <img
                                        src={p.photoURL}
                                        alt="profile"
                                        className="w-full h-full rounded-full border-4 border-white shadow-2xl object-cover"
                                    />

                                </div>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-white">{p.displayName}</h2>
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <MdEmail className="text-white" />
                                    <p className="text-white">{p.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <RiUserSettingsFill className="text-primary text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary">Account Information</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                        <span className="text-slate-600 font-medium">Member Since</span>
                                        <span className="font-semibold text-secondary">
                                            {new Date(p.created_at || new Date()).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-slate-600 font-medium">Role</span>
                                        <span className="font-semibold text-primary capitalize">
                                            {p.role || 'Student'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <FaUserEdit className="text-primary text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary">Profile Actions</h3>
                                </div>
                                <div className="space-y-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => modalRef.current.showModal()}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-primary to-primary/90 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                                    >
                                        <FaUserEdit className="text-lg" />
                                        Edit Profile
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Section */}
                        <div className="bg-linear-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20">
                            <h4 className="text-lg font-semibold text-secondary mb-3">💡 Profile Tips</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                    <span>Use a clear profile picture for better recognition</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                    <span>Keep your name updated for seamless communication</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                    <span>Your profile is visible to tutors and administrators</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Update Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box p-0 max-w-2xl overflow-hidden bg-white rounded-3xl border border-slate-200">
                    {/* Modal Header */}
                    <div className="bg-linear-to-r from-primary to-primary/90 p-8">
                        <h3 className="text-2xl font-bold text-white">Update Profile</h3>
                        <p className="text-blue-50/90 mt-1">Make changes to your profile information</p>
                    </div>

                    {/* Modal Content */}
                    <form onSubmit={handleProfileUpdate} className="p-8">
                        <div className="space-y-8">
                            {/* Profile Image Preview */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 mb-6">
                                    <img
                                        src={previewImage || p.photoURL}
                                        alt="profile preview"
                                        className="w-full h-full rounded-full border-4 border-primary/20 shadow-lg object-cover"
                                    />
                                    <label className="absolute bottom-0 right-0 w-12 h-12 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                                        <FaUpload className="text-white text-lg" />
                                        <input
                                            type="file"
                                            name="photo"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-slate-500">Click the camera icon to upload a new photo</p>
                            </div>

                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-3 items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={p.displayName}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email Field (Read-only) */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary mb-3 items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={p.email}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                    readOnly
                                    disabled
                                />
                                <p className="text-xs text-slate-400 mt-2">Email cannot be changed</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-8 mt-8 border-t border-slate-100">
                            <motion.button
                                type="submit"
                                disabled={isUpdating}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-primary to-primary/90 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="text-lg" />
                                        Save Changes
                                    </>
                                )}
                            </motion.button>

                            <button
                                type="button"
                                onClick={() => {
                                    modalRef.current.close();
                                    setPreviewImage(null);
                                }}
                                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 text-secondary hover:bg-slate-50 hover:border-primary/50 rounded-xl font-medium transition-all duration-300"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                        </div>
                    </form>

                    <button
                        className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white border-none"
                        onClick={() => {
                            modalRef.current.close();
                            setPreviewImage(null);
                        }}
                    >
                        ✕
                    </button>
                </div>

                <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ProfileSettings;