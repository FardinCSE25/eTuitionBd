import React from 'react';

const MyApplicationsLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 lg:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Loading */}
                <div className="text-center mb-12 animate-pulse">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-2xl mb-6 mx-auto"></div>
                    <div className="h-12 bg-gray-200 rounded-lg w-80 max-w-full mx-auto mb-4"></div>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200 mx-auto w-64">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <div className="h-6 bg-gray-300 rounded w-32"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards Loading */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[1, 2, 3, 4].map((card) => (
                        <div key={card} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    ))}
                </div>

                {/* Table Section Loading */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                    <div className="px-6 py-8">
                        {/* Table Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="h-8 bg-gray-200 rounded w-48"></div>
                            <div className="h-6 bg-gray-200 rounded w-32"></div>
                        </div>

                        {/* Table Loading */}
                        <div className="overflow-x-auto rounded-2xl border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {[...Array(7)].map((_, idx) => (
                                            <th key={idx} className="px-6 py-4">
                                                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {/* Loading Rows */}
                                    {[1, 2, 3, 4, 5].map((row) => (
                                        <tr key={row} className="animate-pulse">
                                            {/* # */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                                </div>
                                            </td>
                                            
                                            {/* Student */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                                    <div className="space-y-2">
                                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Subject */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                                </div>
                                            </td>
                                            
                                            {/* Class */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-4 bg-gray-200 rounded w-12"></div>
                                            </td>
                                            
                                            {/* Status */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                                                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                                </div>
                                            </td>
                                            
                                            {/* Applied */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                            </td>
                                            
                                            {/* Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyApplicationsLoading;