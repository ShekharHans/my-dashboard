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
    const yhatValues = data.map((item) => item.yhat);
    const peakDemandValues = data.map((item) => item.PeakDemand_MW);

    // Calculate accuracy ratio
    const totalYhat = yhatValues.reduce((acc, val) => acc + val, 0);
    const totalPeakDemand = peakDemandValues.reduce((acc, val) => acc + val, 0);

    const ratio = (totalYhat / totalPeakDemand)*100;
    const accuracy = (ratio/2)-20;
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

        <div className=" bg-gray-100 p-10 rounded-md">
            <ReactApexChart
                options={pieOptions}
                series={pieSeries}
                type="pie"
                width={380}
            />
            <p className="text-lg font-semibold capitalize text-gray-500 flex justify-center text-center pt-4">Accuracy : {accuracy.toFixed(2)}</p>
        </div>

    );
};

export default YearlyChart;
