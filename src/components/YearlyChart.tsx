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
} from "@mui/material";

interface YearlyChartProps {
    data: {
        Date: string;
        yhat: number;
        PeakDemand_MW: number;
        ID: number;
        fileName: string; // Assuming you have a fileName property in your data
    }[];
}

const YearlyChart: React.FC<YearlyChartProps> = ({ data }) => {
    // Extracting data for IDs <= 146
    const filteredData = data.filter(item => item.ID <= 146);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);

    // Handle page change
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = () => {
        // Since we fixed the rows per page to 5, no action is needed here
        // This function is retained to prevent any warnings/errors
    };

    // Paginated data
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="bg-gray-100 p-10 rounded-md">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Peak Demand</TableCell>
                            <TableCell>Forecasted Value</TableCell>
                            <TableCell>Accuracy Difference (%)</TableCell>
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
                                    {(
                                      100 - (Math.abs(((row.PeakDemand_MW - row.yhat) / row.PeakDemand_MW) * 100))
                                    ).toFixed(2)}%
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
