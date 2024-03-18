import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface MixedBarChartProps {
    date: string;
    data: any[];
}

const MixedBarChart: React.FC<MixedBarChartProps> = ({ date, data }) => {
    // Find the data entry for the selected date
    const selectedData = data.find(item => item.Date === date);

    // If no data found for the selected date, return null
    if (!selectedData) {
        return null;
    }

    // Extract peak demand and yhat values
    const peakDemand = selectedData.PeakDemand_MW;
    const yhat = selectedData.yhat;

    
    // Define series data for the bar chart
    const mixedBarSeries = [
        {
            name: 'Peak Demand',
            data: [peakDemand]
        },
        {
            name: 'Forcasted Value',
            data: [yhat]
        }
    ];

    // Define options for the bar chart
    const mixedBarOptions:ApexOptions = {
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
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#3b82f6', '#eb4034'],
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [selectedData.Date], // Update categories to include the selected date
        },
        yaxis: {
            title: {
                text: 'Value',
            }
        },
        fill: {
            opacity: 1
        },
    };

    return (
        <ReactApexChart options={mixedBarOptions} series={mixedBarSeries} type="bar" height={350} />
    );
};

export default MixedBarChart;
