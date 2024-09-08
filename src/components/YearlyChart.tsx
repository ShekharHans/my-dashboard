import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
} from "@mui/material";

interface YearlyChartProps {
    data: {
        Date: string;
        yhat: number;
        PeakDemand_MW: number;
        ID: number;
        fileName: string;
    }[];
}

const YearlyChart: React.FC<YearlyChartProps> = ({ data = [] }) => {
    // Ensure that data is always an array
    const filteredData = Array.isArray(data) ? data.filter(item => item.ID <= 146 || (item.PeakDemand_MW === 0 && item.yhat > 0)) : [];

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);

    // Handle page change
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = () => {
        // No action needed here for fixed rows per page
    };

    // Paginated data for table display
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Function to convert the **entire** filteredData to CSV format
    const convertToCSV = () => {
        const header = ["Date", "Demand (MW)", "Forecasted Value (MW)", "Accuracy (%)"];
        const rows = filteredData.map(row => {
            const accuracy = (100 - Math.abs(((row.PeakDemand_MW - row.yhat) / row.PeakDemand_MW) * 100)).toFixed(2);
            return [row.Date, row.PeakDemand_MW, row.yhat, accuracy];
        });

        let csvContent = header.join(",") + "\n";
        rows.forEach(row => {
            csvContent += row.join(",") + "\n";
        });

        return csvContent;
    };

    // Function to trigger the download of CSV file for **entire** data
    const downloadCSV = () => {
        const csvContent = convertToCSV(); // This uses the full filtered data
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `yearly_data_full.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-gray-100 p-10 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Yearly Data</h2>
                <Button variant="outlined" onClick={downloadCSV}>
                    Download CSV
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Demand(MW)</TableCell>
                            <TableCell>Forecasted Value(MW)</TableCell>
                            <TableCell>Accuracy(%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow key={row.ID}>
                                <TableCell component="th" scope="row">
                                    {row.Date}
                                </TableCell>
                                <TableCell>{row.PeakDemand_MW}</TableCell>
                                <TableCell>{row.yhat}</TableCell>
                                <TableCell>
                                    {row.PeakDemand_MW === 0
                                        ? "N/A"
                                        : (
                                            100 - (Math.abs(((row.PeakDemand_MW - row.yhat) / row.PeakDemand_MW) * 100))
                                        ).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5]} // Only include option for 5 rows per page
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => handleChangePage(newPage)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default YearlyChart;
