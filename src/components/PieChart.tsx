import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface PieChartProps {
    data: {
        PeakDemand_MW: number;
        EnergyRequired_MU: number;
    }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    // Calculate average PeakDemand_MW and EnergyRequired_MU
    let totalPeakDemand = 0;
    let totalEnergyRequired = 0;

    for (const item of data) {
        totalPeakDemand += item.PeakDemand_MW;
        totalEnergyRequired += item.EnergyRequired_MU;
    }

    const avgPeakDemand = totalPeakDemand / data.length;
    const avgEnergyRequired = totalEnergyRequired / data.length;

    // Calculate the ratio of avgPeakDemand to avgEnergyRequired
    const ratio = avgPeakDemand / avgEnergyRequired;

    // Pie chart options
    const options: ApexOptions = {
        chart: {
            type: 'pie',
            width: 380,
            toolbar: {
                show: false
            },
        },
        labels: ['Peak Demand', 'Energy Required'],
    };

    // Pie chart series data
    const series = [avgPeakDemand, avgEnergyRequired];

    return (
        <div className='bg-gray-100 p-10 rounded-md'>
            <ReactApexChart options={options} series={series} type="pie" width={400} />
            <p className="text-2xl font-semibold text-gray-500 flex justify-center">
                Ratio: {ratio.toFixed(2)}
            </p>
        </div>
    );
};

export default PieChart;
