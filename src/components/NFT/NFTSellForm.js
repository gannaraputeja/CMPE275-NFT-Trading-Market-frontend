/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl, Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { createListing } from '../../api/ListingRequest';

export default function NFTForm({
  open, handleClose, tokenId, setListed,
}) {
  const [user, setUser] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const emptyObj = {
    userId: user.id,
    nftTokenId: tokenId,
    amount: 0,
    currencyType: 'BTC',
    sellType: '',
  };
  const [listingObj, setListingObj] = useState(emptyObj);

  const resetForm = () => {
    setListingObj(emptyObj);
  };

  const cancelForm = () => {
    resetForm();
    handleClose();
  };

  const handleChangeCurrencyType = (e) => {
    setListingObj((prevState) => ({
      ...prevState, currencyType: e.target.value,
    }));
  };

  const handleChangeSellType = (e) => {
    setListingObj((prevState) => ({
      ...prevState, sellType: e.target.value,
    }));
  };

  const handleAmount = (e) => {
    setListingObj((prevState) => ({
      ...prevState, amount: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // console.log(listingObj);
    try {
      const res = await createListing(listingObj);
      alert('Successfully listed for sale');
      setListed(true);
    } catch (err) {
      console.log('Failed to create listing.', err);
      alert('Failed to list for sale.');
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: '500px' }}
        justifyContent="center"
      >
        <Grid container display="flex" justifyContent="center">
          <Grid item>
            <DialogTitle id="alert-dialog-title">
              Sell NFT
            </DialogTitle>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid container display="block" justifyContent="space-evenly">
            <Grid item display="block" sx={{ paddingBottom: 2 }}>
              <FormControl sx={{ width: '300px' }}>
                <InputLabel id="currency-type-select-label">Currency Type</InputLabel>
                <Select
                  labelId="currency-type-label"
                  id="currency-type-select"
                  value={listingObj.currencyType}
                  label="Currency Type"
                  onChange={handleChangeCurrencyType}
                  required
                >
                  <MenuItem value="BTC">BTC</MenuItem>
                  <MenuItem value="ETH">ETH</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item display="block" sx={{ paddingBottom: 1 }}>
              <FormControl sx={{ width: '300px' }}>
                <InputLabel id="sell-type-select-label">Sale Type</InputLabel>
                <Select
                  labelId="sell-type-label"
                  id="sell-type-select"
                  value={listingObj.sellType}
                  label="Sale Type"
                  onChange={handleChangeSellType}
                  required
                >
                  <MenuItem value="PRICED">Priced</MenuItem>
                  <MenuItem value="AUCTION">Auction</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item display="block">
              <TextField
                id="outlined-basic"
                type="number"
                value={listingObj.amount}
                label={listingObj.sellType === 'AUCTION' ? 'Enter min ask price' : 'Enter price'}
                variant="outlined"
                size="small"
                margin="normal"
                onChange={handleAmount}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelForm} color="error" variant="contained">CANCEL</Button>
          <Button onClick={handleSubmit} autoFocus color="success" variant="contained">
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NFTForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  tokenId: PropTypes.string.isRequired,
  setListed: PropTypes.func.isRequired,
};
