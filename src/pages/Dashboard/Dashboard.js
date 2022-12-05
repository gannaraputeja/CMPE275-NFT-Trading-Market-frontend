/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { Box, Container } from '@mui/material';
import React from 'react';
import NftListingsTable from './NftListingsTable';
import NftSalesTable from './NftSalesTable';

function Dashboard() {
  React.useEffect(() => {

  }, []);
  return (
    <Container>
      <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center' }}>
        <NftSalesTable />
        <NftListingsTable />
      </Box>
    </Container>
  );
}

export default Dashboard;
