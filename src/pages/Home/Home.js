/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {
  Alert, Backdrop, Button,
  CircularProgress,
  FormControl, Grid, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import {FilterAlt, FilterAltOff, Sort} from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import NftCard from '../../components/NFT/NftCard';
import { getAllNewListingsWithNewOffers } from '../../api/ListingRequest';

function Home() {
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const [nftType, setNftType] = React.useState('BOTH');
  const [listings, setListings] = useState([]);
  const [data, setData] = useState([]);
  const [defaultPriceRange, setDefaultPriceRange] = useState([5, 30]);
  const [priceRange, setPriceRange] = useState([5, 30]);
  const [sortBy, setSortBy] = useState('listingTime');
  const [madeTransaction, setMadeTransaction] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  const getListings = async () => {
    try {
      const res = await getAllNewListingsWithNewOffers();
      console.log(res.data);
      setData(res.data.filter((listing) => listing.nft.ownerId !== user.id));
      setListings(res.data.filter((listing) => listing.nft.ownerId !== user.id));
      const prices = res.data.map((listing) => listing.price);
      setDefaultPriceRange([Math.min(...prices) - 5, Math.max(...prices) + 5]);
      setPriceRange([Math.min(...prices) - 5, Math.max(...prices) + 5]);
      setIsFetch(true);
    } catch (err) {
      console.log('Failed to getAllNewListingsWithNewOffers.', err);
      setIsFetch(false);
    }
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilter = () => {
    const filteredData = listings.filter((listing) => (nftType === 'BOTH' ? true : listing.sellType === nftType))
      .filter((listing) => priceRange[0] < listing.price && priceRange[1] > listing.price);
    // setData(filteredData);
    if (sortBy === 'name') {
      setData(filteredData.sort((a, b) => {
        const fa = a.nft.name.toLowerCase();
        const fb = b.nft.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }));
    }

    if (sortBy === 'listingTime') {
      setData(filteredData.sort((a, b) => new Date(a.listingTime).getTime() - new Date(b.listingTime).getTime()));
    }

    if (sortBy === 'priceLowToHigh') {
      setData(filteredData.sort((a, b) => a.price - b.price));
    }

    if (sortBy === 'priceHighToLow') {
      setData(filteredData.sort((a, b) => b.price - a.price));
    }
    // setData([]);
  };

  const clearFilter = () => {
    setNftType('BOTH');
    setPriceRange(defaultPriceRange);
    setData(listings);
    setSortBy('listingTime');
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setNftType(event.target.value);
  };

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  React.useEffect(() => {
    getListings();
    console.log(listings);
  }, [madeTransaction, data]);

  return (
    <>
      <Typography variant="h5" />
      <Grid container display="flex" justifyContent="flex-start" spacing={2}>
        <Grid item xs={2}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="nft-type-select-small">NFT Type</InputLabel>
            <Select
              labelId="nft-type-select-small"
              id="nft-type-select-small"
              value={nftType}
              label="NFT Type"
              onChange={handleChange}
            >
              <MenuItem value="BOTH">
                <em>Both</em>
              </MenuItem>
              <MenuItem value="PRICED">Priced</MenuItem>
              <MenuItem value="AUCTION">Auction</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="sort-by-select-small">Sort By</InputLabel>
            <Select
              labelId="sort-by-select-small"
              id="sort-by-select-small"
              value={sortBy}
              label="Sort By"
              onChange={handleChangeSortBy}
            >
              <MenuItem value="listingTime">Listing Time</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="priceLowToHigh">Price (Low to High)</MenuItem>
              <MenuItem value="priceHighToLow">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography> Price Range </Typography>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              getAriaValueText={() => priceRange}
              step={0.01}
              min={0.00}
              max={10.00}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" size="small" style={{ maxHeight: '35px' }} onClick={applyFilter}>
            <FilterAlt style={{ marginRight: '5px' }} />
            {' '}
            Filter
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" size="small" style={{ maxHeight: '35px' }} onClick={clearFilter}>
            <FilterAltOff style={{ marginRight: '5px' }} />
            {' '}
            Clear
          </Button>
        </Grid>

      </Grid>

      <Grid container style={{ display: 'flex' }}>
        { isFetch ? (
          data.length === 0
            ? (
              <Typography variant="h6">
                There are no listings
              </Typography>
            )
            : data.map((listing) => <NftCard data={listing} key={listing.id} setMadeTransaction={setMadeTransaction} />)
        ) : (

          <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
      </Grid>
    </>
  );
}

export default Home;
