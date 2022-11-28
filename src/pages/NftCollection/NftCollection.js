/* eslint-disable react/jsx-filename-extension */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import OwnNft from '../../components/NFT/OwnNft';
import NFTForm from '../../components/NFT/NFTForm';

const nfts = ['priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced', 'priced', 'auctioned', 'priced', 'priced'];

function NftCollection() {
  const [openNewNftForm, setOpenNewNftForm] = React.useState(false);

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
      <Typography variant="h5">
        <strong>Personal NFT Collection</strong>
      </Typography>
      <Grid container spacing={2} style={{ display: 'flex', padding: '10px' }}>
        {
          nfts.map((nft) => <OwnNft type={nft} />)
        }
      </Grid>
      <NFTForm open={openNewNftForm} handleClose={handleCloseNFTForm} />
    </>
  );
}

export default NftCollection;
