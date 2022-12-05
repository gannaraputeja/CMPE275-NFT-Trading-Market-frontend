/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';

function PeriodFilter({ period, handlePeriodState }) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">
          Period
        </InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
          value={period}
          onChange={(e) => handlePeriodState(e.target.value)}
        >
          <option aria-label="None" value="" />
          <option value={1}>Last 24 hours</option>
          <option value={2}>Last week</option>
          <option value={3}>Last Month</option>
        </Select>
      </FormControl>
      <Typography variant="h6">
        {console.log(period)}
      </Typography>
    </>
  );
}

export default PeriodFilter;
