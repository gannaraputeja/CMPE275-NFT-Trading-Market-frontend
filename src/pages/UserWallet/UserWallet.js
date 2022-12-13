/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-unused-vars */
import {
  Box, Button, Container, Grid, Tab, Tabs, Typography,
} from '@mui/material';
import React, {
  useEffect, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import EnhancedTable from './DataTableDisplay';
import { getAllCurrencies, currencyTransaction } from '../../api/WalletRequest';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function UserWallet() {
  const [value, setValue] = useState(0);
  const [BTCCurrencyAmount, setBTCCurrencyAmount] = useState(0);
  const [ETHCurrencyAmount, setETHCurrencyAmount] = useState(0);
  const [amount, setAmount] = useState('');
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );

  const getCurrencies = async () => {
    try {
      const res = await getAllCurrencies(user.id);
      // console.log(res.data);
      setBTCCurrencyAmount(res.data.find((currency) => currency.type === 'BTC').amount);
      setETHCurrencyAmount(res.data.find((currency) => currency.type === 'ETH').amount);
    } catch (err) {
      console.log('Failed to get available currencies.', err);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, [BTCCurrencyAmount, ETHCurrencyAmount]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBTCDepositButton = async () => {
    const data = {
      amount,
      type: 'DEPOSIT',
      currencyType: 'BTC',
      userId: user.id,
    };

    try {
      const res = await currencyTransaction(data);
      // console.log(res);
      alert(`${amount} BTC deposited successfully`);
    } catch (err) {
      console.log('Failed to deposit amount.', err);
    }
  };

  const handleBTCWithdrawButton = async () => {
    const data = {
      amount,
      type: 'WITHDRAW',
      currencyType: 'BTC',
      userId: user.id,
    };

    if (amount > BTCCurrencyAmount) {
      alert('Not enough BTC money to withdraw');
      return;
    }
    try {
      const res = await currencyTransaction(data);
      // console.log(res);
      alert(`${amount} BTC withdrawn successfully`);
    } catch (err) {
      console.log('Failed to withdraw amount.', err);
    }
  };

  const handleETHDepositButton = async () => {
    const data = {
      amount,
      type: 'DEPOSIT',
      currencyType: 'ETH',
      userId: user.id,
    };
    try {
      const res = await currencyTransaction(data);
      // console.log(res);
      alert(`${amount} ETH deposited successfully`);
    } catch (err) {
      console.log('Failed to deposit amount.', err);
    }
  };

  const handleETHWithdrawButton = async () => {
    const data = {
      amount,
      type: 'WITHDRAW',
      currencyType: 'ETH',
      userId: user.id,
    };

    if (amount > ETHCurrencyAmount) {
      alert('Not enough ETH money to withdraw');
      return;
    }
    try {
      const res = await currencyTransaction(data);
      console.log(res);
      alert(`${amount} ETH withdrawn successfully`);
    } catch (err) {
      console.log('Failed to withdraw amount.', err);
    }
  };

  return (
    <Container>
      <Typography variant="h6">
        User Wallet
      </Typography>
      <Grid container display="flex">
        <Grid item spacing={6} padding={2}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="BTC" {...a11yProps(0)} />
                <Tab label="ETH" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography variant="h6">
                Balance:
                {' '}
                { BTCCurrencyAmount }
                {' '}
                BTC
              </Typography>
              <TextField
                id="outlined-basic"
                value={amount}
                label="Enter amount"
                variant="outlined"
                size="small"
                margin="normal"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <Grid container display="flex" justifyContent="space-between">
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={() => handleBTCWithdrawButton()}>Withdraw</Button>
                </Grid>
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={() => handleBTCDepositButton()}>Deposit</Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="h6">
                Balance:
                {' '}
                { ETHCurrencyAmount }
                {' '}
                ETH
              </Typography>
              <TextField
                id="outlined-basic"
                value={amount}
                label="Enter amount"
                variant="outlined"
                margin="normal"
                size="small"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <Grid container display="flex" justifyContent="space-between">
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={() => handleETHWithdrawButton()}>Withdraw</Button>
                </Grid>
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={() => handleETHDepositButton()}>Deposit</Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>

        <Grid item>
          <Box>
            <TabPanel>
              <EnhancedTable />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserWallet;
