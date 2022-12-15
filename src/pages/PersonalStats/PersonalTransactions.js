/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import PeriodFilter from '../Dashboard/PeriodFilter';
import CurrencyFilter from '../Dashboard/CurrencyFilter';
import Transactions from './Transactions';
import { getPersonalTransactions } from '../../api/PersonalTransactions';

const transactions = [
  {
    id: 1,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'priced',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 2,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'priced',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 3,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'auctioned',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 4,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'auctioned',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 5,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'priced',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 6,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'priced',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 7,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'auctioned',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
  {
    id: 8,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e',
    nftName: 'Photos',
    nftType: 'Art',
    buyer: 'nkf_90',
    seller: 'srth098',
    listingType: 'priced',
    price: 100,
    currency: 'BTC',
    transactionDate: '12-06-2022 12:08:10PST',
  },
];

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
    console.log(period, currency);
    // const filterData = [...transactions];
    setChangedState((prev) => prev + 1);
    console.log('prev in handle submit : ', changedState);
    // setTransactionsData(filterData.filter((row) => row.transactionDate >= (Date.now() - period)
    // && row.currency === currency));
  };

  const handleReset = () => {
    setPeriod('');
    setCurrency('');
    setTransactionsData(transactions);
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
