/* eslint-disable no-sparse-arrays */
/* eslint-disable react/jsx-filename-extension */
import { AddCircle } from '@mui/icons-material';
import {
  Button,
  FormControl, Grid, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import React from 'react';
import NftCard from '../../components/NFT/NftCard';
import NFTForm from '../../components/NFT/NewNFTForm';

const nfts = [{ id: '1', type: 'priced' }, { id: '2', type: 'priced' },
  { id: '3', type: 'auctioned' }, { id: '4', type: 'auctioned' }, { id: '5', type: 'priced' }, { id: '6', type: 'priced' },
  { id: '7', type: 'auctioned' }, , { id: '8', type: 'priced' }, { id: '9', type: 'auctioned' }, { id: '10', type: 'priced' }, { id: '11', type: 'priced' }];

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

        <Grid item>
          <Button variant="contained" size="small" style={{ maxHeight: '35px', marginTop: '15px' }} onClick={() => setOpenNewNftForm(true)}>
            <AddCircle style={{ marginRight: '5px' }} />
            {' '}
            Create new NFT
          </Button>
        </Grid>
      </Grid>

      <Grid container style={{ display: 'flex' }}>
        {
          nfts.map((nft) => ((nftType === 'both' || nftType === '') ? <NftCard id={nft.id} type={nft.type} /> : ((nftType === nft) && <NftCard type={nft} />)))
        }
      </Grid>
      <NFTForm open={openNewNftForm} handleClose={handleCloseNFTForm} />
    </>
  );
}

export default Home;
