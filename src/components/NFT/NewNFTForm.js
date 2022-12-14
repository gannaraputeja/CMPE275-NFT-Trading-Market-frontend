/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { CloudUpload } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import storage from '../../firebase';
import { createNFT } from '../../api/NFTRequest';

export default function NewNFTForm({ open, handleClose, setCreated }) {
  const [user, setUser] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const emptyNFT = {
    name: '',
    type: '',
    description: '',
    imageURL: null,
    assetURL: null,
    creatorId: user.id,
    ownerId: user.id,
  };
  const [nftObject, setNftObject] = React.useState(emptyNFT);

  const [imageFile, setImageFile] = React.useState(null);
  const [assetFile, setAssetFile] = React.useState(null);

  const handleChangeNftType = (e) => {
    setNftObject((prevState) => ({
      ...prevState, type: e.target.value,
    }));
  };

  const handleChangeNftName = (e) => {
    setNftObject((prevState) => ({
      ...prevState, name: e.target.value,
    }));
  };

  const handleChangeNftDescription = (e) => {
    setNftObject((prevState) => ({
      ...prevState, description: e.target.value,
    }));
  };

  const handleImageFileUpload = (e) => {
    console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
  };

  const handleAssetFileUpload = (e) => {
    console.log(e.target.files[0]);
    setAssetFile(e.target.files[0]);
  };

  const fileUploadToFirebase = (fileName, folderName) => {
    if (fileName == null) return;
    const imageRef = ref(storage, `${folderName}/${fileName.name + v4()}`);

    uploadBytes(imageRef, imageFile).then((res) => {
      alert('Image uploaded successfully');
      getDownloadURL(imageRef).then((url) => {
        console.log(url);
        if (fileName === imageFile) {
          setNftObject((prevState) => ({
            ...prevState, imageURL: url,
          }));
        }

        if (fileName === assetFile) {
          setNftObject((prevState) => ({
            ...prevState, assetURL: url,
          }));
        }
      });
    }).catch((err) => {
      alert('Image upload failed');
      console.log('Image upload failed.', err);
    });
  };

  const resetForm = () => {
    setNftObject(emptyNFT);
    setImageFile(null);
    setAssetFile(null);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleCreateNewNft = async () => {
    // console.log(nftObject);
    try {
      const res = await createNFT(nftObject);
      alert('Successfully created NFT');
      console.log(res);
      setCreated(true);
    } catch (err) {
      console.log('Failed to create NFT.', err);
      alert('Failed to create NFT');
    }
    resetForm();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: '500px' }}
        justifyContent="center"
      >
        <Grid container display="flex" justifyContent="center">
          <Grid item>
            <DialogTitle id="alert-dialog-title">
              Create a New NFT
            </DialogTitle>
          </Grid>
        </Grid>

        <DialogContent>
          <Grid container display="block" justifyContent="space-evenly">
            <Grid item display="block">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="NFT Name"
                name="name"
                type="text"
                autoFocus
                onChange={handleChangeNftName}
                sx={{ width: 300 }}
              />
            </Grid>

            <Grid item display="block">
              <FormControl sx={{ width: '300px' }}>
                <InputLabel id="demo-simple-select-label">NFT Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={nftObject.type}
                  label="type"
                  onChange={handleChangeNftType}
                  required
                >
                  <MenuItem value="PFPs and Avatars">PFPs and Avatars</MenuItem>
                  <MenuItem value="One-of-one (1/1) artwork">One-of-one (1/1) artwork</MenuItem>
                  <MenuItem value="Generative art">Generative art</MenuItem>
                  <MenuItem value="Collectibles">Collectibles</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="NFT Description"
                name="description"
                type="text"
                multiline
                rows={5}
                sx={{ width: 300 }}
                onChange={handleChangeNftDescription}
              />
            </Grid>

            <Grid container display="block" alignContent="space-evenly">
              <Grid item sx={{ paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  color="info"
                  startIcon={<CloudUpload />}
                  size="small"
                  onClick={() => fileUploadToFirebase(imageFile, 'images')}
                  sx={{ marginRight: 2 }}
                >
                  Upload Image
                </Button>
                <input accept="image/*" type="file" onChange={handleImageFileUpload} placeholder="Choose file" />

                {/* <Typography variant="caption" gutterBottom marginLeft={2}>
                  {imageFile?.name}
                </Typography> */}
              </Grid>
              <Grid item sx={{ paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  color="info"
                  startIcon={<CloudUpload />}
                  size="small"
                  onClick={() => fileUploadToFirebase(assetFile, 'assets')}
                  sx={{ marginRight: 2 }}
                >
                  Upload Asset
                  {/* <input hidden accept="image/*" type="file" /> */}
                </Button>
                <input accept="image/*" type="file" onChange={handleAssetFileUpload} placeholder="Choose file" />

                {/* <Typography variant="caption" gutterBottom marginLeft={2}>
                  {assetFile?.name}
                </Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="error" variant="contained">CANCEL</Button>
          <Button onClick={handleCreateNewNft} autoFocus color="success" variant="contained">
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NewNFTForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setCreated: PropTypes.func.isRequired,
};
