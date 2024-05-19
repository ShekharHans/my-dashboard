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
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Handle page change
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Paginated data
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="bg-gray-100 p-10 rounded-md">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell >Peak Demand</TableCell>
                            <TableCell >Forecasted Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow key={row.ID}>
                                <TableCell component="th" scope="row">
                                    {row.Date}
                                </TableCell>
                                <TableCell >{row.PeakDemand_MW}</TableCell>
                                <TableCell >{row.yhat}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
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
