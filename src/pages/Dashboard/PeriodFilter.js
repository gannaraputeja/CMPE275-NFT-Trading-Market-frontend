/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';

function PeriodFilter() {
  const [period, setPeriod] = React.useState('');

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
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option aria-label="None" value="" />
          <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormControl>
      <Typography variant="h6">
        {console.log(period)}
      </Typography>
    </>
  );
}

export default PeriodFilter;
