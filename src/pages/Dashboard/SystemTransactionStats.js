/* eslint-disable react/jsx-filename-extension */
import { Box, Container } from '@mui/material';
import React from 'react';
import PeriodFilter from './PeriodFilter';
import CurrencyFilter from './CurrencyFilter';
import SystemStatsDeposit from './SystemStatsDeposit';
import SystemStatsWithdrawls from './SystemStatsWithdrawls';
import SystemStatsInitialSysBalance from './SystemStatsInitialSysBalance';
import SystemStatsNFTSales from './SystemStatsNFTSales';

function SystemTransactionStats() {
  React.useEffect(() => {
    // backend call to fetch all the results.
  }, []);
  return (
    <Container>
      <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center' }}>
        <PeriodFilter />
        <CurrencyFilter />
      </Box>
      <Container>
        <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(4, 1fr)', justifyContent: 'center' }}>
          <SystemStatsDeposit />
          <SystemStatsWithdrawls />
          <SystemStatsInitialSysBalance />
          <SystemStatsNFTSales />
        </Box>
      </Container>
    </Container>
  );
}

export default SystemTransactionStats;
