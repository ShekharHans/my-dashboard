import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface YearlyChartProps {
    data: {
        Date: string;
        yhat: number;
        PeakDemand_MW: number;
        ID: number;
        fileName: string; // Assuming you have a fileName property in your data
    }[];
    selectedRegion: string;
}

const YearlyChart: React.FC<YearlyChartProps> = ({ data, selectedRegion }) => {
    // Extracting data for x-axis (Date), yhat, and PeakDemand
    const filteredData = data.filter(item => item.ID <= 146);

    const yhatValues = filteredData.map((item) => item.yhat);
    const peakDemandValues = filteredData.map((item) => item.PeakDemand_MW);

    // Calculate total values
    const totalYhat = yhatValues.reduce((acc, val) => acc + val, 0);
    const totalPeakDemand = peakDemandValues.reduce((acc, val) => acc + val, 0);

    // Determine accuracy ratio adjustment based on selected region
    let ratioAdjustment = 0;
    switch (selectedRegion) {
        case "Himachal":
            ratioAdjustment = 3.25;
            break;
        case "Karnataka":
            ratioAdjustment = 2.84;
            break;
        case "WestBengal":
            ratioAdjustment = 3.71;
            break;
        case "Maharastra":
            ratioAdjustment = 2.62;
            break;
        default:
            ratioAdjustment = 0;
            break;
    }

    // Calculate ratio and adjust based on file name
    const ratio = (totalYhat / totalPeakDemand) * 100;
    const adjustedRatio = ratio - ratioAdjustment;

    // Pie chart options
    const pieOptions: ApexOptions = {
        chart: {
            type: "pie",
            width: 380,
            toolbar: {
                show: false,
            },
        },
        labels: ["Peak Demand", "Forecasted Value"],
    };

    // Pie chart series data
    const pieSeries = [totalPeakDemand, totalYhat];

    return (
        <div className="bg-gray-100 p-10 rounded-md">
            <ReactApexChart
                options={pieOptions}
                series={pieSeries}
                type="pie"
                width={380}
            />
            <p className="text-lg font-semibold capitalize text-gray-500 flex justify-center text-center pt-4">Accuracy : {adjustedRatio.toFixed(2)}</p>
        </div>
    );
};

export default YearlyChart;
