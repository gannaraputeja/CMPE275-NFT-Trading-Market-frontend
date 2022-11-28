/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';
import NftCardInfo from './NftCardInfo';

export default function NftCard({ type = 'priced' }) {
  const openDetailsModal = () => {
    alert('Modal opened');
  };
  return (
    <Card sx={{
      maxWidth: 250, marginInline: '10px', marginY: '10px',
    }}
    >
      <CardMedia
        component="img"
        height="140"
        width="140"
        image="https://nft-trading-market-object-storage.sfo3.digitaloceanspaces.com/Images/NFT_marketplace.ico"
        alt="NFT Icon"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          NFT Icon
          {' '}
          <Chip style={{ marginLeft: '5px' }} label={type.toUpperCase()} color={type === 'priced' ? 'info' : 'warning'} />
        </Typography>

        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }}>
          A non-fungible token is a unique digital identifier that cannot be copied, substituted, or subdivided,
          that is recorded in a blockchain,
          and that is used to certify authenticity and ownership
        </Typography>

        <Typography style={{ marginTop: '20px' }}>
          Price:
          {' '}
          <strong>1.2 ETH</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="success" variant="contained" onClick={openDetailsModal}>BUY</Button>
        <Button size="small" color="inherit" variant="text" onClick={<NftCardInfo />}>Details</Button>
      </CardActions>
    </Card>
  );
}

NftCard.propTypes = {
  type: PropTypes.string.isRequired,
};
