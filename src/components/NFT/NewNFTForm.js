/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { CloudUpload } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import storage from '../../firebase';

export default function NewNFTForm({ open, handleClose }) {
  const [nftObject, setNftObject] = React.useState({
    nftName: '',
    nftType: '',
    nftDescription: '',
    nftImageUrl: null,
    nftAssetUrl: null,
  });

  const [imageFile, setImageFile] = React.useState(null);
  const [assetFile, setAssetFile] = React.useState(null);

  const handleChangeNftType = (e) => {
    setNftObject((prevState) => ({
      ...prevState, nftType: e.target.value,
    }));
  };

  const handleChangeNftName = (e) => {
    setNftObject((prevState) => ({
      ...prevState, nftName: e.target.value,
    }));
  };

  const handleChangeNftDescription = (e) => {
    setNftObject((prevState) => ({
      ...prevState, nftDescription: e.target.value,
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
      alert('Image uploaded sucessfully');
      getDownloadURL(imageRef).then((url) => {
        console.log(url);
        if (fileName === imageFile) {
          setNftObject((prevState) => ({
            ...prevState, nftImageUrl: url,
          }));
        }

        if (fileName === assetFile) {
          setNftObject((prevState) => ({
            ...prevState, nftAssetUrl: url,
          }));
        }
      });
    }).catch((err) => {
      alert('Image upload failed');
      console.log(err);
    });
  };

  const handleCreateNewNft = () => {
    console.log(nftObject);
    setNftObject({
      nftName: '',
      nftType: '',
      nftDescription: '',
      nftImageUrl: null,
      nftAssetUrl: null,
    });
    setImageFile(null);
    setAssetFile(null);
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
                id="nftName"
                label="NFT Name"
                name="nftName"
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
                  value={nftObject.nftType}
                  label="nftType"
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
                id="nftDescription"
                label="NFT Description"
                name="nftDescription"
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
          <Button onClick={handleClose} color="error" variant="contained">CANCEL</Button>
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
};
