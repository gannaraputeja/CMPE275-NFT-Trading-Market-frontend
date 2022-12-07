/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Chip } from '@mui/material';

const columns = [
  {
    field: 'avatar',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => (
      <div style={{ padding: 5, justifyContent: 'center' }}>
        <img alt="#" src={params.value} height="50px" width="50px" />
      </div>
    ),
  },
  { field: 'nftName', headerName: 'NFT Name', width: 100 },
  {
    field: 'nftType',
    headerName: 'NFT Type',
    width: 150,
    editable: true,
  },
  {
    field: 'buyer',
    headerName: 'Buyer',
    width: 80,
    editable: true,
  },
  {
    field: 'seller',
    headerName: 'Seller',
    width: 80,
    editable: true,
  },
  {
    field: 'listingType',
    headerName: 'Listing Type',
    description: 'This column has a value getter and is not sortable.',
    width: 120,
    renderCell: (params) => (
      <Chip label={params.value === 'priced' ? 'Priced' : 'Auctioned'} color={params.value === 'priced' ? 'info' : 'success'} />
    ),
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 80,
  },
  {
    field: 'currency',
    headerName: 'Currency',
    type: 'string',
    width: 80,
  },
  {
    field: 'transactionDate',
    headerName: 'Transaction Date',
    type: 'Date',
    width: 200,
  },
];

export default function DataGridDemo({ transactionsData }) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={transactionsData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        onColumnHeaderClick={() => console.log('Header clicked')}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
