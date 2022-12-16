/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Chip } from '@mui/material';

const columns = [
  // {
  //   field: 'avatar',
  //   headerName: 'Image',
  //   width: 100,
  //   renderCell: (params) => (
  //     <div style={{ padding: 5, justifyContent: 'center' }}>
  //       <img alt="#" src={params.value} height="50px" width="50px" />
  //     </div>
  //   ),
  // },
  {
    field: 'actionType',
    headerName: 'Action',
    width: 150,
    // editable: true,
  },
  {
    field: 'currencyType',
    headerName: 'Currency',
    width: 80,
    // editable: true,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 80,
    editable: true,
  },
  // {
  //   field: 'listingType',
  //   headerName: 'Listing Type',
  //   description: 'This column has a value getter and is not sortable.',
  //   width: 120,
  //   renderCell: (params) => (
  //     <Chip label={params.value === 'priced' ? 'Priced' : 'Auctioned'}
  //  color={params.value === 'priced' ? 'info' : 'success'} />
  //   ),
  // },
  {
    field: 'availableAmount',
    headerName: 'available Balance',
    type: 'number',
    width: 200,
  },
  {
    field: 'user.firstname',
    headerName: 'user',
    type: 'string',
    renderCell: (params) => params.row.user.firstname,
    width: 80,
  },
  {
    field: 'createdOn',
    headerName: 'Transaction Date',
    type: 'Date',
    width: 200,
  },
  {
    field: 'nft.name',
    headerName: 'nft',
    type: 'string',
    renderCell: (params) => (params.row.nft && params.row.nft.name) || '----',
    width: 150,
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
        // checkboxSelection
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
