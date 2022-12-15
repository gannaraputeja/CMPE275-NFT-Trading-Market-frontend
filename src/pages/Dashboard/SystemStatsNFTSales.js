/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SystemStats({ systemTransactionsData }) {
  return (
    <TableContainer component={Paper} sx={{ margin: 5 }}>
      <Table sx={{ minWidth: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stat</TableCell>
            <TableCell align="center">Total Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="Total NFT Sales"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Total NFT Sales
            </TableCell>
            <TableCell align="center">{systemTransactionsData.totalNFTSales}</TableCell>
          </TableRow>
          <TableRow
            key="Total Currency Amount"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Total Currency Amount
            </TableCell>
            <TableCell align="center">{systemTransactionsData.totalNFTSalesCurrencyAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
