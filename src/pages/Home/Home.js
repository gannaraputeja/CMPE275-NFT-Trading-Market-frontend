/* eslint-disable react/jsx-filename-extension */
import {
  FormControl, Grid, InputLabel, MenuItem, Select,
} from '@mui/material';
import React from 'react';
import NftCard from '../../components/NFT/NftCard';

const nfts = ['priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced'];

function Home() {
  const [nftType, setNftType] = React.useState('');

  const handleChange = (event) => {
    setNftType(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">NFT Type</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={nftType}
          label="NFT Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Priced</MenuItem>
          <MenuItem value={20}>Auctioned</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} style={{ display: 'flex', padding: '10px' }}>
        {
          nfts.map((nft) => <NftCard type={nft} />)
        }
      </Grid>
    </>
  );
}

export default Home;
