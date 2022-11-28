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
    console.log(event.target.value);
    setNftType(event.target.value);
  };

  React.useEffect(() => {
    console.log('Fetching data from backend');

    return () => {
      console.log('Cleanup code');
    };
  }, []);

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
          <MenuItem value="both">
            <em>Both</em>
          </MenuItem>
          <MenuItem value="priced">Priced</MenuItem>
          <MenuItem value="auctioned">Auctioned</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} style={{ display: 'flex', padding: '10px' }}>
        {
          nfts.map((nft) => ((nftType === 'both' || nftType === '') ? <NftCard type={nft} /> : ((nftType === nft) && <NftCard type={nft} />)))
        }
      </Grid>
    </>
  );
}

export default Home;
