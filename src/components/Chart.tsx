import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartProps {
    data: any[];
    chartType: string;
}

const Chart: React.FC<ChartProps> = ({ data, chartType }) => {
    let series: any[] = [];
    let options: ApexOptions = {};
    const filteredData = data.filter(item => item.ID <= 146);
    if (chartType === 'PeakDemand') {
        series = [
            {
                name: 'Peak Demand',
                data: filteredData.map((item) => ({
                    x: new Date(item.Date),
                    y: item.PeakDemand_MW,
                })),
            },
        ];
        options = {
            chart: {
                id: 'peak-demand-chart',
                type: 'area',
                height: 400,
                toolbar: {
                    show: false
                },
            },
            stroke: {
                width: 3
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Peak Demand (MW)',
                },
            },
        };

        // Adding mixed chart for PeakDemand and Trend
        const mixedSeries = [
            {
                name: 'Peak Demand',
                data: data.map((item) => ({
                    x: new Date(item.Date),
                    y: item.PeakDemand_MW,
                })),
            },
            {
                name: 'Trend',
                data: data.map((item) => ({
                    x: new Date(item.Date),
                    y: item.trend,
                })),
            },
        ];
        const mixedOptions: ApexOptions = {
            chart: {
                id: 'mixed-peak-demand-chart',
                type: 'line',
                height: 400,
                toolbar: {
                    show: false
                },
            },
            colors: ['#3b82f6', '#eb4034'],
            stroke: {
                width: 3
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Value',
                },
            },
        };

        return (
            <div className="chart">
                <ReactApexChart options={options} series={series} type="line" height={400} />
                <ReactApexChart options={mixedOptions} series={mixedSeries} type="line" height={400} />
            </div>
        );
    } else if (chartType === 'Energy') {
        series = [
            {
                name: 'Energy Required',
                data: filteredData.map((item) => ({
                    x: new Date(item.Date),
                    y: item.EnergyRequired_MU,
                })),
            },
        ];
        options = {
            chart: {
                id: 'energy-chart',
                type: 'area',
                height: 400,
                toolbar: {
                    show: false
                },
            },
            stroke: {
                width: 3
            },

            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Energy Required (MU)',
                },
            },
        };

        // Adding mixed chart for Energy and Yhat
        const mixedSeries = [
            {
                name: 'Energy Required',
                data: data.map((item) => ({
                    x: new Date(item.Date),
                    y: item.EnergyRequired_MU,
                })),
            },
            {
                name: 'Yhat',
                data: data.map((item) => ({
                    x: new Date(item.Date),
                    y: item.yhat,
                })),
            },
        ];
        const mixedOptions: ApexOptions = {
            chart: {
                id: 'mixed-energy-chart',
                type: 'line',
                height: 400,
                toolbar: {
                    show: false
                },
            },
            colors: ['#3b82f6', '#eb4034'],
            stroke: {
                width: 3
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Value',
                },
            },
        };

        return (
            <div className="chart">
                <ReactApexChart options={options} series={series} type="line" height={400} />
                <ReactApexChart options={mixedOptions} series={mixedSeries} type="line" height={400} />
            </div>
        );
    }

    return null;
};

export default Chart;
