/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ImageListItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NftSellForm from './NFTSellForm';

export default function OwnNft({ data, setListed }) {
  const [open, setOpen] = React.useState(false);
  const [saleForm, setSaleForm] = React.useState(false);
  const defaultImageURL = 'https://nft-trading-market-object-storage.sfo3.digitaloceanspaces.com/Images/NFT_marketplace.ico';
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSaleForm = () => {
    setSaleForm(false);
  };

  const handleOpenSaleForm = () => {
    setSaleForm(true);
  };

  const navigateToListings = () => {
    navigate('../nftsale');
  };

  return (
    <>

      <Card sx={{
        maxWidth: 250, marginInline: '10px', marginY: '10px',
      }}
      >
        {/* <CardHeader
          title="NFT Name"
          action={(
            <IconButton aria-label="settings" onClick={() => console.log('Sell NFT')}>
              <MoreVertIcon />
            </IconButton>
          )}
        /> */}
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={data.imageURL ? data.imageURL : defaultImageURL}
          alt="NFT Icon"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            { data.name }
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }} gutterBottom>
            { data.description }
          </Typography>

          {/* <Typography>
            Price:
            {' '}
            <strong>
              {Math.random().toFixed(2)}
              {' '}
              BTC
            </strong>
          </Typography> */}
        </CardContent>
        <CardActions>
          {data.listings.length === 0
            ? <Button size="small" color="error" variant="contained" onClick={handleOpenSaleForm} disabled={data.listings.length !== 0}>SELL</Button>
            : <Button size="small" color="error" variant="contained" onClick={navigateToListings}>View Offers</Button>}
          <Button size="small" color="inherit" variant="text" onClick={handleClickOpen}>Details</Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { data.name }
        </DialogTitle>
        <DialogContent>
          <DialogContentText height={120} width={120}>
            <ImageListItem>
              <img
                alt="nftimage"
                src={data.imageURL ? data.imageURL : defaultImageURL}
                loading="lazy"
                height={50}
                width={50}
              />
            </ImageListItem>
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Token ID: </span>
            { data.tokenId }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Smart Contract Address: </span>
            { data.smartContractAddress }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Type: </span>
            { data.type }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Creator: </span>
            { `${data.creator.firstname} ${data.creator.lastname}` }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Last Recorded Time: </span>
            { data.lastRecordedTime }
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontWeight: 'bold' }}>Description: </span>
            { data.description }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <NftSellForm open={saleForm} handleClose={handleCloseSaleForm} tokenId={data.tokenId} setListed={setListed} />

      {/* <Dialog
        open={saleForm}
        onClose={handleCloseSaleForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          NFT Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ImageListItem>
              <img
                alt="nftimage"
                src="https://nft-trading-market-object-storage.sfo3.digitaloceanspaces.com/Images/NFT_marketplace.ico"
                loading="lazy"
                height={50}
                width={50}
              />
            </ImageListItem>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            A non-fungible token is a unique digital identifier that cannot be copied, substituted, or subdivided,
            that is recorded in a blockchain,
            and that is used to certify authenticity and ownership
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaleForm} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

OwnNft.propTypes = {
  data: PropTypes.shape({
    tokenId: PropTypes.string.isRequired,
    smartContractAddress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    assetURL: PropTypes.string,
    lastRecordedTime: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    listings: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  setListed: PropTypes.func.isRequired,
};
