/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import {
  Box, Button, Container, Grid, Tab, Tabs, Typography,
} from '@mui/material';
import React, {
  useEffect, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import EnhancedTable from './DataTableDisplay';
import { availableCurrency, currencyTransaction} from '../../api/WalletRequest';

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

  useEffect( () => {
    const getCurrencies = async () => {
      const res = await availableCurrency('25defd27-55d6-4cd5-85c8-a9fd4fda7976');
      console.log(res.data);
      setBTCCurrencyAmount(res.data.find(currency => currency['type'] === 'BTC')['amount']);
      setETHCurrencyAmount(res.data.find(currency => currency['type'] === 'ETH')['amount']);
    }
    getCurrencies();
  }, [BTCCurrencyAmount, ETHCurrencyAmount]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [amount, setAmount] = useState("");

  const handleBTCDepositButton = async() =>{
    const data ={
      "amount": amount,
      "type": "DEPOSIT",
      "currencyType": "BTC",
      "userId": "7831c64c-bfcc-4bf9-a2bf-fadae8b77ce4",
    };

    const res = await currencyTransaction(data);
    console.log(res);
    alert(`${amount} BTC deposited successfully`);
  };

  const handleBTCWithdrawButton = async() =>{
    const data ={
      "amount": amount,
      "type": "WITHDRAW",
      "currencyType": "BTC",
      "userId": "7831c64c-bfcc-4bf9-a2bf-fadae8b77ce4",
    };

    const res = await currencyTransaction(data);
    console.log(res);
    alert(`${amount} BTC withdrawn succesfully`);
  };

  const handleETHDepositButton = async() =>{
    const data ={
      "amount": amount,
      "type": "DEPOSIT",
      "currencyType": "ETH",
      "userId": "7831c64c-bfcc-4bf9-a2bf-fadae8b77ce4",
    };

    const res = await currencyTransaction(data);
    console.log(res);
    alert(`${amount} ETH deposited successfully`);
  };

  const handleETHWithdrawButton = async() =>{
    const data ={
      "amount": amount,
      "type": "WITHDRAW",
      "currencyType": "ETH",
      "userId": "7831c64c-bfcc-4bf9-a2bf-fadae8b77ce4",
    };

    const res = await currencyTransaction(data);
    console.log(res);
    alert(`${amount} ETH withdrawn succesfully`);
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
                Balance - { BTCCurrencyAmount } BTC
              </Typography>
              <TextField id="outlined-basic" value = {amount} label="Enter amount" variant="outlined" size="small" onChange={(e)=>{
                setAmount(e.target.value)
              }}/>
              <Grid container display="flex" justifyContent="space-between">
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={ () => handleBTCWithdrawButton()} >Withdraw</Button>
                </Grid>
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={ () => handleBTCDepositButton()} >Deposit</Button>
                </Grid>
              </Grid>
              <h3> your entered value is: {amount}</h3>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="h6">
                Balance - { ETHCurrencyAmount } ETH
              </Typography>
              <TextField id="outlined-basic" value = {amount}  label="Enter amount" variant="outlined" size="small" onChange={(e)=>{
                setAmount(e.target.value)
              }}/>
              <Grid container display="flex" justifyContent="space-between">
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={ () => handleETHWithdrawButton() }>Withdraw</Button>
                </Grid>
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained" onClick={ () => handleETHDepositButton() }>Deposit</Button>
                </Grid>
              </Grid>
              <h3> your entered value is: {amount}</h3>
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
