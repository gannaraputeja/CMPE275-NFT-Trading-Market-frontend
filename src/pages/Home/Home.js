/* eslint-disable no-sparse-arrays */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import {
  Alert,
  FormControl, Grid, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import NftCard from '../../components/NFT/NftCard';
import { getAllNewListings } from '../../api/ListingRequest';

function Home() {
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const [nftType, setNftType] = React.useState('');
  const [listings, setListings] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setNftType(event.target.value);
  };

  const getNFTs = async () => {
    try {
      const res = await getAllNewListings();
      console.log(res.data);
      setListings(res.data);
    } catch (err) {
      console.log('Failed to getAllNewListedNFTs.', err);
    }
  };

  React.useEffect(() => {
    getNFTs();
  }, []);

  return (
    <>
      <Typography variant="h5" />
      <Grid container display="flex" justifyContent="space-between">
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">NFT Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={nftType}
              label="NFT Type"
              onChange={handleChange}
            >
              <MenuItem value="both">
                <em>Both</em>
              </MenuItem>
              <MenuItem value="PRICED">Priced</MenuItem>
              <MenuItem value="AUCTION">Auction</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container style={{ display: 'flex' }}>
        { listings.length === 0
          ? (
            <Alert
              severity="success"
              sx={{
                width: 700,
                height: 60,
                fontSize: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '50px',
              }}
            >
              There are no listings.
            </Alert>
          )
          : listings.filter((listing) => (nftType === '' || nftType === 'both' ? true : listing.sellType === nftType))
            .filter((listing) => listing.nft.ownerId !== user.id)
            .map((listing) => <NftCard data={listing} key={listing.id} />)}
      </Grid>
    </>
  );
}

export default Home;
