/* eslint-disable react/jsx-filename-extension */
import { AddCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl, Grid, InputLabel, MenuItem, Select,
} from '@mui/material';
import React from 'react';
import NftCard from '../../components/NFT/NftCard';
import NFTForm from '../../components/NFT/NFTForm';

const nfts = ['priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced'];

function Home() {
  const [nftType, setNftType] = React.useState('');
  const [openNewNftForm, setOpenNewNftForm] = React.useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setNftType(event.target.value);
  };

  const handleCloseNFTForm = () => {
    setOpenNewNftForm(false);
  };

  React.useEffect(() => {
    console.log('Fetching data from backend');

    return () => {
      console.log('Cleanup code');
    };
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
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

        <Button variant="contained" size="small" style={{ maxHeight: '35px', marginTop: '15px' }} onClick={() => setOpenNewNftForm(true)}>
          <AddCircle style={{ marginRight: '5px' }} />
          {' '}
          Create new NFT
        </Button>
      </Box>

      <Grid container spacing={2} style={{ display: 'flex', padding: '10px' }}>
        {
          nfts.map((nft) => ((nftType === 'both' || nftType === '') ? <NftCard type={nft} /> : ((nftType === nft) && <NftCard type={nft} />)))
        }
      </Grid>
      <NFTForm open={openNewNftForm} handleClose={handleCloseNFTForm} />
    </>
  );
}

export default Home;
