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
    const areaOptions: ApexOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            },
        },
        colors: ['#546E7A'],
        stroke: {
            width: 1
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            categories: dates,

        },
        yaxis: {
            title: {
                text: 'Yearly Value',
            },
            labels: {
                show: false
            },
        },
    };

    // Area chart series data
    const areaSeries = [
        {
            name: 'Yearly',
            data: yearlyValues,
        },
    ];

    let positiveSum = 0;
    let negativeSum = 0;

    // Calculate the sums of positive and negative values
    data.forEach(item => {
        if (item.yearly > 0) {
            positiveSum += item.yearly;
        } else {
            negativeSum += item.yearly;
        }
    });

    // Calculate the ratio of positive to negative values
    const positiveRatio = Math.abs(positiveSum / (positiveSum + Math.abs(negativeSum)));
    const negativeRatio = Math.abs(negativeSum / (positiveSum + Math.abs(negativeSum)));

    // Pie chart options
    const pieOptions = {
        labels: ['Positive', 'Negative'],
        colors: ['#1abc9c', '#e74c3c'],
        dataLabels: {
            enabled: true,
            formatter: (val: number) => {
                return val.toFixed(2);
            },
        },
    };

    // Pie chart series data
    const pieSeries = [positiveRatio, negativeRatio];

    return (
        <div className='flex w-full gap-8 items-center justify-around mt-8'>
            <div className=' bg-gray-100 p-10 rounded-md'>
                <ReactApexChart options={pieOptions} series={pieSeries} type="pie" width={380} />
            </div>
            <div className='w-[700px]  bg-gray-100 p-10 rounded-md'>
                <ReactApexChart options={areaOptions} series={areaSeries} type="area" height={400} />
            </div>
        </div>
    );
};

export default YearlyChart;
