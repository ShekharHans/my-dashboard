import React from 'react';
import { BarChart, Wallet, LogIn } from 'lucide-react';

interface SidebarProps {
    handleChartTypeChange: (chartType: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleChartTypeChange }) => {
    // Set the default option to "PeakDemand"
    const defaultOption: string = "PeakDemand";

    const handleClick = (chartType: string) => {
        handleChartTypeChange(chartType);
    };

    return (
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8 sidebar">
            <div className="mt-6 flex flex-1 flex-col justify-between">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-900">Analytics</label>
                        <button className={defaultOption === "PeakDemand" ? "flex w-full transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 active" : "flex w-full transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"} onClick={() => handleClick("PeakDemand")}>
                            <BarChart className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Peak Demand</span>
                        </button>
                        <button className={defaultOption === "Energy" ? "w-full flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 active" : "flex w-full transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"} onClick={() => handleClick("Energy")}>
                            <Wallet className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Energy Required</span>
                        </button>
                    </div>
                    
                </nav>
                <div className="mt-6">

                    <div className="mt-6 flex items-center justify-between">
                        <a href="#" className="flex items-center gap-x-2">
                            <img
                                className="h-7 w-7 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="avatar"
                            />
                            <span className="text-sm font-medium text-gray-700">Dan Abromov</span>
                        </a>
                        <a
                            href="#"
                            className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
                        >
                            <LogIn className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
