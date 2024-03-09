import React from 'react';
import { BarChart, Wallet} from 'lucide-react';

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
        <aside className="flex h-screen w-64 flex-col overflow-hidden border-r bg-white px-5 py-8 sidebar">
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

            </div>
        </aside>
    )
}

export default Sidebar;
