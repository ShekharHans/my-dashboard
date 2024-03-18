import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface YearlyChartProps {
    data: {
        Date: string;
        yhat: number;
        PeakDemand_MW: number;
    }[];
}

const YearlyChart: React.FC<YearlyChartProps> = ({ data }) => {
    // Extracting data for x-axis (Date), yhat, and PeakDemand
    const dates = data.map((item) => item.Date);
    const yhatValues = data.map((item) => item.yhat);
    const peakDemandValues = data.map((item) => item.PeakDemand_MW);

    // Calculate accuracy ratio
    const totalYhat = yhatValues.reduce((acc, val) => acc + val, 0);
    const totalPeakDemand = peakDemandValues.reduce((acc, val) => acc + val, 0);

    // Area chart options
    const areaOptions: ApexOptions = {
        chart: {
            type: "area",
            width: 600,
            height: 350,
            toolbar: {
                show: false,
            },
        },
        colors: ["#546E7A"],
        stroke: {
            width: 1,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: "datetime",
            categories: dates,
        },
        yaxis: {
            title: {
                text: "Forcasted Value",
            },
            labels: {
                show: false,
            },
        },
    };

    // Area chart series data
    const areaSeries = [
        {
            name: "Forcasted Value",
            data: yhatValues,
        },
    ];

    // Pie chart options
    const pieOptions: ApexOptions = {
        chart: {
            type: "pie",
            width: 380,
            toolbar: {
                show: false,
            },
        },
        labels: ["Peak Demand", "Forcasted Value"],
    };

    // Pie chart series data
    const pieSeries = [totalPeakDemand, totalYhat];

    return (
        <div className="flex w-full gap-8 items-center justify-around mt-8">
            <div className="w-[700px] bg-gray-100 p-10 rounded-md">
                <ReactApexChart
                    options={areaOptions}
                    series={areaSeries}
                    type="area"
                    height={400}
                />
            </div>
            <div className=" bg-gray-100 p-10 rounded-md">
                <ReactApexChart
                    options={pieOptions}
                    series={pieSeries}
                    type="pie"
                    width={380}
                />
            </div>
        </div>
    );
};

export default YearlyChart;
