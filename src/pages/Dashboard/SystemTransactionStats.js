/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import PeriodFilter from './PeriodFilter';
import CurrencyFilter from './CurrencyFilter';
import SystemStatsDeposit from './SystemStatsDeposit';
import SystemStatsWithdrawls from './SystemStatsWithdrawls';
import SystemStatsInitialSysBalance from './SystemStatsInitialSysBalance';
import SystemStatsNFTSales from './SystemStatsNFTSales';

import { getSystemTransactionStats } from '../../api/SystemTransactionStats ';

function SystemTransactionStats() {
  const [period, setPeriod] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [systemTransactionsData, setSystemTransactionsData] = React.useState([]);
  const [changedState, setChangedState] = React.useState(0);

  const getSystemTransactions = async () => {
    try {
      const res = await getSystemTransactionStats();
      setSystemTransactionsData(res.data);
      return res.data;
    } catch (err) {
      return err;
    }
  };
  const handlePeriodState = (value) => {
    setPeriod(value);
  };

  const handleCurrencyState = (value) => {
    setCurrency(value);
  };

  const handleSubmit = () => {
    setChangedState((prev) => prev + 1);
  };

  const handleReset = () => {
    setPeriod('');
    setCurrency('');
    setChangedState((prev) => prev + 1);
  };
  React.useEffect(() => {
    getSystemTransactions();
  }, [changedState]);

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
          <SystemStatsDeposit systemTransactionsData={systemTransactionsData} />
          <SystemStatsWithdrawls systemTransactionsData={systemTransactionsData} />
          <SystemStatsInitialSysBalance systemTransactionsData={systemTransactionsData} />
          <SystemStatsNFTSales systemTransactionsData={systemTransactionsData} />
        </Box>
      </Container>
    </Container>
  );
}

export default SystemTransactionStats;
