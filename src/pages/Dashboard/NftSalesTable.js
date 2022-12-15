/* eslint-disable no-unused-vars */
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

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Active NFTs for Sale', 100),
  createData('Priced', 50),
  createData('Auctioned', 50),
];

export default function NftSalesTable({ dashboardData }) {
  return (
    <TableContainer component={Paper} sx={{ margin: 5 }}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stat</TableCell>
            <TableCell align="center">Total Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="Active NFTs for Sale"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Active NFTs for Sale
            </TableCell>
            <TableCell align="center">
              {dashboardData.totalActiveNFTSForSale}
            </TableCell>
          </TableRow>

          <TableRow
            key="Priced"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Priced
            </TableCell>
            <TableCell align="center">
              {dashboardData.pricedActiveNFTSForSale}
            </TableCell>
          </TableRow>

          <TableRow
            key="Auctioned"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Auctioned
            </TableCell>
            <TableCell align="center">
              {dashboardData.auctionedActiveNFTSForSale}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
