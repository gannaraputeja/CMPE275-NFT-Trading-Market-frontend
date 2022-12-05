/* eslint-disable react/jsx-filename-extension */
import { Box, Container } from '@mui/material';
import React from 'react';
import Filter from './PeriodFilter';

function SystemTransactionStats() {
  return (
    <Container>
      <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center' }}>
        <Filter type="period" />
        <Filter type="currency" />
      </Box>
    </Container>
  );
}

export default SystemTransactionStats;
