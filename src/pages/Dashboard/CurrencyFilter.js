/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';

function PeriodFilter({ currency, handleCurrencyState }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel htmlFor="grouped-native-select">
        Currency
      </InputLabel>
      <Select
        native
        defaultValue=""
        id="grouped-native-select"
        label="Grouping"
        value={currency}
        onChange={(e) => handleCurrencyState(e.target.value)}
      >
        <option aria-label="None" value="" />
        <optgroup label="Supported Currencies">
          <option value={1}>BTC</option>
          <option value={2}>ETH</option>
        </optgroup>
        <optgroup label="All Currencies">
          <option value={3}>USDT</option>
          <option value={4}>BNB</option>
          <option value={4}>USDC</option>
          <option value={4}>BUSD</option>
          <option value={4}>XRP</option>
        </optgroup>
      </Select>
    </FormControl>
  );
}

export default PeriodFilter;
