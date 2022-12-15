/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import PeriodFilter from '../Dashboard/PeriodFilter';
import CurrencyFilter from '../Dashboard/CurrencyFilter';
import Transactions from './Transactions';
import { getPersonalTransactions } from '../../api/PersonalTransactions';

function SystemTransactionStats() {
  const [period, setPeriod] = React.useState('');
  const [currency, setCurrency] = React.useState('');
  const [transactionsData, setTransactionsData] = React.useState([]);
  const [changedState, setChangedState] = React.useState(0);
  const [user] = React.useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );

  const getPersonalTransactionStats = async () => {
    const newPeriod = period == null ? 1 : period;
    try {
      const res = await getPersonalTransactions(user.id, newPeriod, currency);
      console.log('Data : ', res.data);
      setTransactionsData(res.data);
      return res.data;
    } catch (err) {
      console.log('Failed to getPersonalTransactionStats.', err);
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
    // setTransactionsData(transactions);
  };

  React.useEffect(() => {
    console.log('prev in use effect: ', changedState);
    // backend call to fetch all the results.
    getPersonalTransactionStats();
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
          <Button variant="outlined" type="submit" size="small" sx={{ height: '30px' }} onClick={handleReset}>RESET</Button>
        </div>
      </Box>
      <Container>
        <Box sx={{ display: 'flex', gridTemplateRows: 'repeat(4, 1fr)', justifyContent: 'center' }}>
          <Transactions transactionsData={transactionsData} />
        </Box>
      </Container>
    </Container>
  );
}

export default SystemTransactionStats;
