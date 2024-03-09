import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface MixedBarChartProps {
    data: {
        Date: string;
        trend: number;
        yhat: number;
    }[];
}

const MixedBarChart: React.FC<MixedBarChartProps> = ({ data }) => {
    // Grouping data by year and calculating the sum of Trend and Yhat values for each year
    const groupedData: { [year: string]: { trendSum: number; yhatSum: number } } = {};
    data.forEach(item => {
        const year = item.Date.split('-')[2]; // Extracting year from the Date
        if (!groupedData[year]) {
            groupedData[year] = { trendSum: 0, yhatSum: 0 };
        }
        groupedData[year].trendSum += item.trend;
        groupedData[year].yhatSum += item.yhat;
    });

    // Extracting aggregated data for x-axis (Year) and y-axis (Trend sum, Yhat sum)
    const years = Object.keys(groupedData);
    const trendSums = Object.values(groupedData).map(data => data.trendSum);
    const yhatSums = Object.values(groupedData).map(data => data.yhatSum);

    // Mixed bar chart options
    // Mixed bar chart options
    // Mixed bar chart options
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: years,
        },
        yaxis: {
            title: {
                text: 'Value',
            },
            labels: {
                formatter: function(val) {
                    return val.toFixed(0); // Set the number of decimal places
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val.toFixed(2);
                },
            },
        },

    };


    // Mixed bar chart series data
    const series = [
        {
            name: 'Trend',
            data: trendSums,
        },
        {
            name: 'Yhat',
            data: yhatSums,
        },
    ];

    return (
        <div className='w-[700px] bg-gray-100 p-10 rounded-md'>
            <ReactApexChart options={options} series={series} type="bar" height={400} />
        </div>
    );
};

export default MixedBarChart;
