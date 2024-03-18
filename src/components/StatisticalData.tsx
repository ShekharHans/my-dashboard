import React from 'react';

const StatisticalData: React.FC<{ data: any[] }> = ({ data }) => {
    let minPeakDemand = Number.POSITIVE_INFINITY;
    let maxPeakDemand = Number.NEGATIVE_INFINITY;
    let totalPeakDemand = 0;
    let totalTempC = 0;
    let totalAverageInflation = 0;

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

            // Temp_C
            totalTempC += item.Temp_C;

            // Average_inflation
            totalAverageInflation += item.Average_inflation;
        }
    }

    const avgPeakDemand = totalPeakDemand / filteredData.length;
    const avgTempC = totalTempC / filteredData.length;
    const avgAverageInflation = totalAverageInflation / filteredData.length;

    return (
        <div className="flex gap-4 justify-between">
            <div className="w-full grid grid-cols-5 sm:grid-cols-5 gap-4 bg-gray-100 p-10 rounded-md">
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Max PeakDemand_MW :
                        <br />
                        <span className="value">
                            {maxPeakDemand !== Number.NEGATIVE_INFINITY ? maxPeakDemand : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Min PeakDemand_MW :
                        <br />
                        <span className="value">
                            {minPeakDemand !== Number.POSITIVE_INFINITY ? minPeakDemand : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Avg PeakDemand_MW :
                        <br />
                        <span className="value">
                            {!Number.isNaN(avgPeakDemand) ? avgPeakDemand.toFixed(2) : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Avg Temp_C :
                        <br />
                        <span className="value">
                            {!Number.isNaN(avgTempC) ? avgTempC.toFixed(2) : 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="card">
                    <p className="text-base font-semibold capitalize text-gray-500">
                        Avg Average_inflation :
                        <br />
                        <span className="value">
                            {!Number.isNaN(avgAverageInflation) ? avgAverageInflation.toFixed(2) : 'N/A'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatisticalData;
