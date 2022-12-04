/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { CloudUpload } from '@mui/icons-material';

export default function NewNFTForm({ open, handleClose }) {
  const [nftObject, setNftObject] = React.useState({
    nftName: '',
    nftType: '',
    nftDescription: '',
    nftImage: '',
    nftAsset: '',
  });

  const handleChange = (e) => {
    setNftObject((prevState) => ({
      ...prevState, nftType: e.target.value,
    }));
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
                sx={{ width: 300 }}
              />
            </Grid>

            <Grid item display="block">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">NFT Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={nftObject.nftType}
                  label="nftType"
                  onChange={handleChange}
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
              />
            </Grid>
            <Grid container display="flex" justifyContent="space-evenly">
              <Grid item>
                <Button variant="contained" component="label" color="info" startIcon={<CloudUpload />} size="small">
                  Upload Image
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" component="label" color="info" startIcon={<CloudUpload />} size="small">
                  Upload Asset
                  <input hidden accept="image/*" multiple type="file" />
                </Button>

              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">CANCEL</Button>
          <Button onClick={handleClose} autoFocus color="success" variant="contained">
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
