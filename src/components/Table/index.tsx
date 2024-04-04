import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableFooter, TableSortLabel, Box
} from "@mui/material";
import {visuallyHidden} from "@mui/utils";

import {useState, useMemo, MouseEvent, ChangeEvent} from "react";

import {stableSort, getComparator} from "../../libs/utils.ts";

interface TableComponent {
    rows: readonly { count: number; name: string}[];
    cells: string[];
    numOfElements: number;
}

export function TableComponent({rows, cells, numOfElements}: TableComponent) {
    const [page, setPage] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(numOfElements);
    const [orderBy, setOrderBy] = useState(rows[0].name);
    const [order, setOrder] = useState<"asc" | "desc" | undefined>('asc')
    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * numberOfElements,
                page * numberOfElements + numberOfElements,
            ),
        [rows, order, orderBy, page, numberOfElements],
    );

    return <>
        <div className="flex gap-4 items-center justify-center">
            <label>Number of elements shown in the table</label>
            <input type="text" value={numberOfElements} onChange={(e) => setNumberOfElements(+e.target.value)} className="p-2 bg-slate-100 rounded-lg shadow-md"/>
        </div>
        <TableContainer component={Paper} className="max-w-lg">
        <Table  aria-label="simple table">
            <TableHead>
                <TableRow>
                    {cells.map(cell => <TableCell key={cell} sortDirection={orderBy === cell ? order : false}>
                        <TableSortLabel active={orderBy === cell} direction={orderBy === cell ? order : 'asc'} onClick={() => handleRequestSort(cell)}>{cell}{orderBy === cell ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}</TableSortLabel></TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>{visibleRows.map(row => <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.count}</TableCell>
            </TableRow>)} </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]} count={rows.length} page={page} rowsPerPage={numberOfElements} onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        setNumberOfElements(parseInt(e.target.value, 10))
                        setPage(0)
                    }} onPageChange={(_e: MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage)}/>
                </TableRow>
            </TableFooter>
            </Table>
        </TableContainer>
    </>
}