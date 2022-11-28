/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function NFTForm({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ minWidth: '500px' }}
      >
        <DialogTitle id="alert-dialog-title">
          Create a New NFT
        </DialogTitle>
        <DialogContent>
          <Input placeholder="NFT name">
            NFT Name
          </Input>
          <Input placeholder="NFT Type">
            NFT Name
          </Input>
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

NFTForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
