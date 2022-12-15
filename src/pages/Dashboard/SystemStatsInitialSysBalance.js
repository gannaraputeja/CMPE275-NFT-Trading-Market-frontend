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

export default function SystemStatsWithdrawls({ systemTransactionsData }) {
  return (
    <TableContainer component={Paper} sx={{ margin: 5 }}>
      <Table sx={{ minWidth: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Total Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="Initial System Balance"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Initial System Balance
            </TableCell>
            <TableCell align="center">{systemTransactionsData.initialSystemBalance}</TableCell>
          </TableRow>

          <TableRow
            key="Current System Balance"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Current System Balance
            </TableCell>
            <TableCell align="center">{systemTransactionsData.PapercurrentSystemBalance}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
