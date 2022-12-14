/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import {
  Alert, Button, Grid, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { AddCircle } from '@mui/icons-material';
import OwnNft from '../../components/NFT/OwnNft';
import NFTForm from '../../components/NFT/NewNFTForm';
import { getPersonalNFTs } from '../../api/NFTRequest';

// const nfts = ['priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced'];

function NftCollection() {
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const [openNewNftForm, setOpenNewNftForm] = React.useState(false);
  const [created, setCreated] = useState(false);
  const [listed, setListed] = useState(false);
  const [nfts, setNFTs] = useState([]);

  const handleCloseNFTForm = () => {
    setOpenNewNftForm(false);
  };

  const getNFTs = async () => {
    try {
      const res = await getPersonalNFTs(user.id);
      setNFTs(res.data);
      console.log(res.data);
    } catch (err) {
      console.log('Failed to retrieve NFTs.', err);
    }
  };

  React.useEffect(() => {
    getNFTs();
    setCreated(false);
    setListed(false);
  }, [created, listed]);

  return (
    <>
      <Typography variant="h5">
        <strong>Personal NFT Collection</strong>
      </Typography>
      <Grid container display="flex" justifyContent="flex-end" style={{ marginBottom: '15px' }}>
        <Grid item>
          <Button variant="contained" size="small" style={{ maxHeight: '35px' }} onClick={() => setOpenNewNftForm(true)}>
            <AddCircle style={{ marginRight: '5px' }} />
            {' '}
            Create new NFT
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ display: 'flex', padding: '10px' }}>
        { nfts.length === 0
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
              You have no NFTs.
            </Alert>
          )
          : nfts.map((nft) => <OwnNft data={nft} key={nft.tokenId} setListed={setListed} />)}
      </Grid>
      <NFTForm open={openNewNftForm} handleClose={handleCloseNFTForm} setCreated={setCreated} />
    </>
  );
}

export default NftCollection;
