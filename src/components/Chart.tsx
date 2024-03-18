import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Modal, Box } from '@mui/material';
import MixedBarChart from './MixedBarChart ';

const style = {
    position: 'absolute' as 'absolute',
    width: '45%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ChartProps {
    data: any[];
    chartType: string; // Add chartType prop
}


const Chart: React.FC<ChartProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<any>(null);

    const handleOpen = (values: any) => {
        const { PeakDemand, yhat, Date, Temp_C, Average_inflation } = values;
        setSelectedValues({
            PeakDemand,
            yhat,
            Date,
            Temp_C,
            Average_inflation
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const mixedSeries = [
        {
            name: 'Peak Demand',
            data: data.map((item) => ({
                x: new Date(item.Date),
                y: item.PeakDemand_MW,
            })),
        },
        {
            name: 'Forcasted Value',
            data: data.map((item) => ({
                x: new Date(item.Date),
                y: item.yhat,
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
            events: {
                click: (_event, _chartContext, config) => {
                    if (config.dataPointIndex !== undefined) {
                        const selectedDataPoint = config.dataPointIndex;
                        const selectedValues = {
                            PeakDemand: data[selectedDataPoint].PeakDemand_MW,
                            yhat: data[selectedDataPoint].yhat,
                            Date: data[selectedDataPoint].Date,
                            Temp_C: data[selectedDataPoint].Temp_C,
                            Average_inflation: data[selectedDataPoint].Average_inflation
                        };
                        handleOpen(selectedValues);
                    }
                }
            }
        },
        colors: ['#3b82f6', '#eb4034'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
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
            <ReactApexChart options={mixedOptions} series={mixedSeries} type="line" height={400} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                keepMounted
            >
                <Box sx={style} className="flex justify-center items-center gap-8">
                    <div className=' flex  flex-col gap-8'>
                        <div className="card">
                            <p className="text-base font-semibold capitalize text-gray-500">
                                Temp_C :
                                <br />
                                <span className="value">{selectedValues?.Temp_C}</span>
                            </p>
                        </div>
                        <div className="card">
                            <p className="text-base font-semibold capitalize text-gray-500">
                                Average_inflation :
                                <br />
                                <span className="value">{selectedValues?.Average_inflation}</span>
                            </p>
                        </div>
                        <div className="card">
                            <p className="text-base font-semibold capitalize text-gray-500">
                                PeakDemand_MW :
                                <br />
                                <span className="value">{selectedValues?.PeakDemand}</span>
                            </p>
                        </div>
                    </div>
                    <div className='mixedbarchart'>
                        {selectedValues && <MixedBarChart date={selectedValues.Date} data={data} />}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Chart;
