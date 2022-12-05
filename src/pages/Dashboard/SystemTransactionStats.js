/* eslint-disable react/jsx-filename-extension */
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import PeriodFilter from './PeriodFilter';
import CurrencyFilter from './CurrencyFilter';
import SystemStatsDeposit from './SystemStatsDeposit';
import SystemStatsWithdrawls from './SystemStatsWithdrawls';
import SystemStatsInitialSysBalance from './SystemStatsInitialSysBalance';
import SystemStatsNFTSales from './SystemStatsNFTSales';

function SystemTransactionStats() {
  const [period, setPeriod] = React.useState('');
  const [currency, setCurrency] = React.useState('');

  const handlePeriodState = (value) => {
    setPeriod(value);
  };

  const handleCurrencyState = (value) => {
    setCurrency(value);
  };

  const handleSubmit = () => {
    console.log(period, currency);
  };

  const handleReset = () => {
    setPeriod('');
    setCurrency('');
  };
  React.useEffect(() => {
    // backend call to fetch all the results.
  }, []);
  return (
    <Container>
      <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(2, 1fr)', justifyContent: 'center' }}>
        <PeriodFilter period={period} handlePeriodState={handlePeriodState} />
        <CurrencyFilter currency={currency} handleCurrencyState={handleCurrencyState} />
        <div style={{
          alignContent: 'center', marginTop: 20, marginBottom: 20, marginRight: 10,
        }}
        >
          <Button
            variant="contained"
            type="submit"
            size="small"
            sx={{ height: '30px' }}
            onClick={handleSubmit}
            disabled={!period.length > 0 || !currency.length > 0}
          >
            SUBMIT

          </Button>
        </div>
        <div style={{ alignContent: 'center', marginTop: 20, marginBottom: 20 }}>
          <Button
            variant="outlined"
            type="submit"
            size="small"
            sx={{ height: '30px' }}
            onClick={handleReset}
          >
            RESET

          </Button>
        </div>
      </Box>
      <Container>
        <Box sx={{ display: 'flex', gridTemplateRows: 'auto', justifyContent: 'center' }}>
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
