/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import PeriodFilter from '../Dashboard/PeriodFilter';
import CurrencyFilter from '../Dashboard/CurrencyFilter';
import Transactions from './Transactions';

const transactions = [
  {
    id: 1,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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
    avatar: 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico0531b430-0640-49a8-87a6-a9edd4c9aab5?alt=media&token=b53d127c-b7a3-4a34-b6fa-2b543451ab79',
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

  const handlePeriodState = (value) => {
    setPeriod(value);
  };

  const handleCurrencyState = (value) => {
    setCurrency(value);
  };

  const handleSubmit = () => {
    console.log(period, currency);
    const filterData = [...transactions];
    setTransactionsData(filterData.filter((row) => row.transactionDate >= (Date.now() - period)
    && row.currency === currency));
  };

  const handleReset = () => {
    setPeriod('');
    setCurrency('');
    setTransactionsData(transactions);
  };

  React.useEffect(() => {
    // backend call to fetch all the results.
    setTransactionsData(transactions);
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
