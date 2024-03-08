import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface AreaChartProps {
    data: {
        Date: string;
        yearly: number;
    }[];
}

const YearlyChart: React.FC<AreaChartProps> = ({ data }) => {
    // Extracting data for x-axis (Date) and y-axis (Yearly)
    const dates = data.map(item => item.Date);
    const yearlyValues = data.map(item => item.yearly);

    // Area chart options
    const options:ApexOptions = {
        chart: {
            type: 'area',
            height: 350,

        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: dates,

        },
        yaxis: {
            title: {
                text: 'Yearly Value',
            },
            // labels: {
            //     formatter: function (val) {
            //         return val.toFixed(2);
            //     },
            // },
            labels: {
                show: false
            },
        },
    };

    // Area chart series data
    const series = [
        {
            name: 'Yearly',
            data: yearlyValues,
        },
    ];

    return (
        <div className='w-[500px]'>
            <ReactApexChart options={options} series={series} type="area" height={400} />
        </div>
    );
};

export default YearlyChart;
