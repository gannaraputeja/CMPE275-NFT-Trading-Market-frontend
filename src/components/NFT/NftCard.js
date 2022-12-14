/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {buyNFT, makeOffer} from '../../api/NFTRequest';
// import SelectUnstyled from '@mui/base/SelectUnstyled';
// import OptionUnstyled from '@mui/base/OptionUnstyled';

export default function NftCard({ data, setMadeTransaction }) {
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const navigate = useNavigate();
  const [price, setPrice] = React.useState(0);
  const [expirationTime, setExpirationTime] = React.useState(dayjs('2022-12-15'));

  const [showDetails, setShowDetails] = React.useState(false);
  const [openMakeNewOffer, setOpenMakeNewOffer] = React.useState(false);

  const [currencyType, setCurrencyType] = React.useState('BTC');

  const defaultImageUrl = 'https://nft-trading-market-object-storage.sfo3.digitaloceanspaces.com/Images/NFT_marketplace.ico';

  const handleClickOpen = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleBuy = async (listing) => {
    const buyNftObj = {
      listingId: listing.id,
      nftTokenId: listing.nft.tokenId,
      userId: user.id,
      currencyType: listing.currencyType,
    };
    try {
      console.log(buyNftObj);
      const res = await buyNFT(buyNftObj);
      setMadeTransaction(true);
      console.log(res.data);
    } catch (err) {
      console.log('Failed to buy NFT.', err);
      alert(err.response.data.message);
    }
  };

  const handleOpenMakeNewOffer = (e) => {
    // console.log(data.id);
    setOpenMakeNewOffer(true);
  };

  const handleCloseMakeNewOffer = () => {
    setPrice(0);
    setExpirationTime(dayjs('2022-12-15'));
    setOpenMakeNewOffer(false);
  };

  const handleSubmitOffer = async (listing) => {
    if (listing.offers.length === 0 && price < listing.price) {
      alert('Make offer price has to be at least minimum ask price.');
    } else if (listing.offers.length > 0 && price <= listing.price) {
      alert('Make offer price has to be higher than current highest price.');
    } else {
      const expiry = dayjs().add(expirationTime.hour(), 'h')
        .add(expirationTime.minute(), 'm').add(expirationTime.second(), 's');
      const offerObj = {
        listingId: listing.id,
        nftTokenId: listing.nft.tokenId,
        userId: user.id,
        amount: price,
        expirationTime: expiry.format('YYYY-MM-DD HH:mm:ss'),
      };
      try {
        console.log(offerObj);
        const res = await makeOffer(offerObj);
        console.log(res.data);
        setMadeTransaction(true);
        alert('Successfully made an offer.');
      } catch (err) {
        console.log('Failed to make offer.', err);
        alert(err.response.data.message);
      } finally {
        setOpenMakeNewOffer(false);
        setPrice(0);
        setExpirationTime(dayjs('2022-12-15'));
      }
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrencyType(e.target.value);
  };

  const displayPriceText = (obj) => {
    let text = '';
    if (obj.sellType === 'PRICED') {
      text = 'Price:';
    } else if (obj.offers.length === 0) {
      text = 'Min ask price:';
    } else {
      text = 'Highest offer price:';
    }
    return text;
  };

  const hasMadeOffers = (obj) => {
    if (obj.offers && obj.offers.length > 0) {
      return obj.offers.map((offer) => offer.userId).includes(user.id);
    }
    return false;
  };

  const hasMadeHighestOffer = (obj) => {
    if (obj.offers.length === 0) {
      return false;
    }
    return obj.offers.reduce((x, y) => (x.amount < y.amount ? y : x)).userId === user.id;
  };

  const handleCancelOffer = () => {

  };

  return (
    <>
      <Card
        id={data.id}
        sx={{
          maxWidth: 250, marginInline: '10px', marginY: '10px',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={data.nft.imageURL ? data.nft.imageURL : defaultImageUrl}
          alt="NFT Icon"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            { data.nft.name }
            <Chip style={{ marginLeft: '5px' }} label={data.sellType.toUpperCase()} color={data.sellType === 'PRICED' ? 'info' : 'warning'} />
          </Typography>

          <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }} gutterBottom>
            { data.nft.description }
          </Typography>

          <Typography>
            { displayPriceText(data) }
            {' '}
            <strong>
              { data.price }
              {' '}
              { data.currencyType }
            </strong>
          </Typography>

          {/* <Typography>
            Listing Time:
            {' '}
            {data.listingTime}
          </Typography> */}
        </CardContent>
        <CardActions>
          { data.sellType === 'PRICED' && <Button size="small" color="success" variant="contained" onClick={() => handleBuy(data)}>BUY</Button> }
          { data.sellType === 'AUCTION' && <Button size="small" color="secondary" variant="contained" onClick={handleOpenMakeNewOffer}>Make an Offer</Button> }
          {/* { hasMadeOffers(data) && <Button size="small" color="secondary" variant="contained" onClick={navigateToListings}>View Offers</Button> } */}
          <Button size="small" color="inherit" variant="text" onClick={handleClickOpen}>Details</Button>
        </CardActions>
      </Card>

      <Dialog
        open={showDetails}
        onClose={handleCloseDetails}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { data.nft.name }
        </DialogTitle>
        <DialogContent>
          <DialogContentText height={120} width={120}>
            <ImageListItem>
              <img
                alt="nftimage"
                src={data.nft.imageURL ? data.nft.imageURL : defaultImageUrl}
                loading="lazy"
                height={50}
                width={50}
              />
            </ImageListItem>
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Token ID: </span>
            { data.nft.tokenId }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Type: </span>
            { data.nft.type }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Price: </span>
            { `${data.amount} ${data.currencyType}`}
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Sale Type: </span>
            { data.sellType }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Listing Time: </span>
            { data.listingTime }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Last Recorded Time: </span>
            { data.nft.lastRecordedTime }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Creator: </span>
            { `${data.nft.creator.firstname} ${data.nft.creator.lastname}` }
          </DialogContentText>
          <DialogContentText>
            <span style={{ fontWeight: 'bold' }}>Owner: </span>
            { `${data.nft.owner.firstname} ${data.nft.owner.lastname}` }
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontWeight: 'bold' }}>Description: </span>
            { data.nft.description }
          </DialogContentText>
          {hasMadeOffers(data)
              && (
              <>
                <DialogContentText>
                  <span style={{fontWeight: 'bold'}}>Offer Price: </span>
                  {data.offers.find((off) => off.userId === user.id).amount}
                </DialogContentText>
                <DialogContentText>
                  <span style={{fontWeight: 'bold'}}>Offer Created Date: </span>
                  {data.offers.find((off) => off.userId === user.id).createdOn}
                </DialogContentText>
                <DialogContentText>
                  <span style={{fontWeight: 'bold'}}>Offer Expiration Date: </span>
                  {data.offers.find((off) => off.userId === user.id).expirationTime}
                </DialogContentText>
              </>
              )}
        </DialogContent>
        <DialogActions>
          { hasMadeOffers(data) && !hasMadeHighestOffer(data) && <Button onClick={() => handleCancelOffer()} color="error" variant="contained"> Cancel Offer </Button>}
          <Button onClick={handleCloseDetails} autoFocus> Close </Button>
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
                /* InputProps={{
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
                }} */
                value={price}
                type="number"
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
              <Button onClick={() => handleSubmitOffer(data)} autoFocus color="success" variant="contained">SUBMIT</Button>
            </Grid>

          </Grid>
        </DialogActions>
      </Dialog>

    </>
  );
}

NftCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number,
    price: PropTypes.number,
    currencyType: PropTypes.string.isRequired,
    sellType: PropTypes.string.isRequired,
    listingStatus: PropTypes.string.isRequired,
    listingTime: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.number,
      userId: PropTypes.string,
      expirationTime: PropTypes.string,
      createdOn: PropTypes.string,
    })).isRequired,
    nft: PropTypes.shape({
      tokenId: PropTypes.string.isRequired,
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
    }).isRequired,
  }).isRequired,
  setMadeTransaction: PropTypes.func.isRequired,
};
