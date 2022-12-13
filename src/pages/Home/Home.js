/* eslint-disable no-sparse-arrays */
/* eslint-disable react/jsx-filename-extension */
import {
  FormControl, Grid, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import React from 'react';
import NftCard from '../../components/NFT/NftCard';
import { getAllNewListedNFTs } from '../../api/NFTRequest';

function Home() {
  const [nftType, setNftType] = React.useState('');
  const nfts = [{ id: '1', type: 'priced' }, { id: '2', type: 'priced' },
    { id: '3', type: 'auctioned' }, { id: '4', type: 'auctioned' }, { id: '5', type: 'priced' }, { id: '6', type: 'priced' },
    { id: '7', type: 'auctioned' }, , { id: '8', type: 'priced' }, { id: '9', type: 'auctioned' }, { id: '10', type: 'priced' }, { id: '11', type: 'priced' }];

  const handleChange = (event) => {
    console.log(event.target.value);
    setNftType(event.target.value);
  };

  const getNFTs = async () => {
    try {
      const res = await getAllNewListedNFTs();
      console.log(res.data);
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
              <MenuItem value="priced">Priced</MenuItem>
              <MenuItem value="auctioned">Auctioned</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container style={{ display: 'flex' }}>
        {
          nfts.map((nft) => ((nftType === 'both' || nftType === '') ? <NftCard id={nft.id} type={nft.type} /> : ((nftType === nft.type) && <NftCard type={nft.type} />)))
        }
      </Grid>
    </>
  );
}

export default Home;
