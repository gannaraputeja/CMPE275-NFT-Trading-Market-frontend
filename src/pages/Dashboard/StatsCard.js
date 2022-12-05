/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from './NftSalesTable';

export default function StatsCard() {
  return (
    <Card sx={{ minWidth: 275, padding: 2, margin: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Active NFTs for Sale
        </Typography>
        <Table />
      </CardContent>
      <CardActions />
    </Card>
  );
}
