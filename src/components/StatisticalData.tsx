import React from 'react';
const StatisticalData: React.FC<{ data: any[] }> = ({ data }) => {
    let minPeakDemand = Number.POSITIVE_INFINITY;
    let maxPeakDemand = Number.NEGATIVE_INFINITY;
    let minEnergyRequired = Number.POSITIVE_INFINITY;
    let maxEnergyRequired = Number.NEGATIVE_INFINITY;
    let totalPeakDemand = 0;
    let totalEnergyRequired = 0;

    // Filter data till ID 146
    const filteredData = data.filter(item => item.ID <= 146);

    if (filteredData.length > 0) {
        for (const item of filteredData) {
            // PeakDemand_MW
            if (item.PeakDemand_MW < minPeakDemand) {
                minPeakDemand = item.PeakDemand_MW;
            }
            if (item.PeakDemand_MW > maxPeakDemand) {
                maxPeakDemand = item.PeakDemand_MW;
            }
            totalPeakDemand += item.PeakDemand_MW;

            // EnergyRequired_MU
            if (item.EnergyRequired_MU < minEnergyRequired) {
                minEnergyRequired = item.EnergyRequired_MU;
            }
            if (item.EnergyRequired_MU > maxEnergyRequired) {
                maxEnergyRequired = item.EnergyRequired_MU;
            }
            totalEnergyRequired += item.EnergyRequired_MU;
        }
    }

    const avgPeakDemand = totalPeakDemand / filteredData.length;
    const avgEnergyRequired = totalEnergyRequired / filteredData.length;

    return (
        <div className="flex gap-4 justify-between">
            <div className="w-full grid grid-cols-6 sm:grid-cols-6 gap-4 bg-gray-100 p-10 rounded-md">
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Max PeakDemand_MW:
                        <br />
                        <span className="value">
                            {maxPeakDemand !== Number.NEGATIVE_INFINITY ? maxPeakDemand : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Min PeakDemand_MW:
                        <br />
                        <span className="value">
                            {minPeakDemand !== Number.POSITIVE_INFINITY ? minPeakDemand : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Max EnergyRequired_MU:
                        <br />
                        <span className="value">
                            {maxEnergyRequired !== Number.NEGATIVE_INFINITY ? maxEnergyRequired : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Min EnergyRequired_MU:
                        <br />
                        <span className="value">
                            {minEnergyRequired !== Number.POSITIVE_INFINITY ? minEnergyRequired : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Avg PeakDemand_MW:
                        <br />
                        <span className="value">
                            {!Number.isNaN(avgPeakDemand) ? avgPeakDemand.toFixed(2) : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className=" text-base font-semibold capitalize text-gray-500">
                        Avg EnergyRequired_MU:
                        <br />
                        <span className="value">
                            {!Number.isNaN(avgEnergyRequired) ? avgEnergyRequired.toFixed(2) : 'N/A'}
                        </span>
                    </p>
                </div>

            </div>

        </div>

    );
};

export default StatisticalData;
