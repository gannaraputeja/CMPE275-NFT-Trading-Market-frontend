/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
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
  Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControl,
  Grid,
  ImageListItem,
  InputAdornment,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { CloudUpload, CurrencyBitcoin, CurrencyExchange } from '@mui/icons-material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import SelectUnstyled from '@mui/base/SelectUnstyled';
// import OptionUnstyled from '@mui/base/OptionUnstyled';

export default function NftCard({ type = 'priced', id }) {
  const [price, setPrice] = React.useState();
  const [expirationTime, setExpirationTime] = React.useState(dayjs('2022-04-07'));

  const [open, setOpen] = React.useState(false);
  const [openMakeNewOffer, setOpenMakeNewOffer] = React.useState(false);

  const [currencyType, setCurrencyType] = React.useState('BTC');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMakeNewOffer = (e) => {
    console.log(id);
    setOpenMakeNewOffer(true);
  };

  const handleCloseMakeNewOffer = () => {
    setPrice();
    setExpirationTime();
    setOpenMakeNewOffer(false);
  };

  const handleSubmitOffer = () => {
    console.log(price, expirationTime);
    setOpenMakeNewOffer(false);
    setPrice();
    setExpirationTime();
  };

  const handleCurrencyChange = (e) => {
    setCurrencyType(e.target.value);
  };

  return (
    <>
      <Card
        id={id}
        sx={{
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

          <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }} gutterBottom>
            A non-fungible token is a unique digital identifier that cannot be copied, substituted, or subdivided,
            that is recorded in a blockchain,
            and that is used to certify authenticity and ownership
          </Typography>

          <Typography>
            Price:
            {' '}
            <strong>
              {Math.random().toFixed(2)}
              {' '}
              BTC
            </strong>
          </Typography>
        </CardContent>
        <CardActions>
          {type === 'priced' ? <Button size="small" color="success" variant="contained">BUY</Button>
            : <Button size="small" color="secondary" variant="contained" onClick={handleOpenMakeNewOffer}>Make an Offer</Button> }
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

      <Dialog
        open={openMakeNewOffer}
        onClose={handleCloseMakeNewOffer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: '500px' }}
        justifyContent="center"
      >
        <Grid container display="flex" justifyContent="center">
          <Grid item>
            <DialogTitle id="alert-dialog-title">
              Make an Offer
            </DialogTitle>
          </Grid>
        </Grid>

        <DialogContent>
          <Grid container display="block" justifyContent="space-evenly">
            <Grid item display="block" sx={{ marginBottom: '15px' }}>
              <TextField
                label="Offer Price"
                id="standard-start-adornment"
                sx={{ width: '230PX' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        // labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currencyType}
                        label="currency"
                        onChange={handleCurrencyChange}
                        required
                        sx={{
                          '& fieldset': { border: 'none' }, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, marginLeft: '0px', paddingLeft: '0px',
                        }}
                        disableUnderline
                        variant="standard"
                      >
                        <MenuItem value="BTC" defaultChecked>BTC</MenuItem>
                        <MenuItem value="ETH">ETH</MenuItem>
                      </Select>

                    </InputAdornment>
                  ),
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid item display="block">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label="Expiration Time"
                  value={expirationTime}
                  onChange={(newValue) => {
                    setExpirationTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container display="flex" justifyContent="space-evenly">
            <Grid item>
              <Button onClick={handleCloseMakeNewOffer} color="error" variant="contained">CANCEL</Button>

            </Grid>
            <Grid item>
              <Button onClick={handleSubmitOffer} autoFocus color="success" variant="contained">

                SUBMIT
              </Button>
            </Grid>

          </Grid>
        </DialogActions>
      </Dialog>

    </>
  );
}

NftCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
