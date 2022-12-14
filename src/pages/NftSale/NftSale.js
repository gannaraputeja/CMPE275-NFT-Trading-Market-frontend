/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import {Typography} from '@mui/material';
import CollapsibleTable from './CollapsibleTable';

function NftSale() {
  return (
    <>
      <Typography variant="h5">
        <strong>NFT Sale</strong>
      </Typography>
      <CollapsibleTable />
    </>
  );
}

export default NftSale;
