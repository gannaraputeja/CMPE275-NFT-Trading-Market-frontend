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
import NftSellForm from './NFTSellForm';

export default function OwnNft() {
  const [open, setOpen] = React.useState(false);
  const [saleForm, setSaleForm] = React.useState(false);

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
          image="https://nft-trading-market-object-storage.sfo3.digitaloceanspaces.com/Images/NFT_marketplace.ico"
          alt="NFT Icon"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            NFT Icon
            {' '}
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }} gutterBottom>
            A non-fungible token is a unique digital identifier that cannot be copied, substituted, or subdivided,
            that is recorded in a blockchain,
            and that is used to certify authenticity and ownership
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
          <Button size="small" color="error" variant="contained" onClick={handleOpenSaleForm}>SELL</Button>
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
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <NftSellForm open={saleForm} handleClose={handleCloseSaleForm} />

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
