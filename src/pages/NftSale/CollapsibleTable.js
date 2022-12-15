/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint linebreak-style: ["error", "unix"] */

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { Skeleton } from '@mui/material';
import {getAllListings, cancelListing, acceptOffer} from '../../api/WalletRequest';

function Row(props) {
  const { row, setListingCancelled } = props;
  const defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e';
  const [open, setOpen] = React.useState(false);

  const handleCancelButton = async (data) => {
    if (data.offers.length === 0) {
      const res = await cancelListing(data.id);
      console.log(res);
      alert(`listing ${data.id} successfully cancelled`);
      setListingCancelled(true);
    } else {
      console.log('listing cannot be cancelled when there are already offers');
    }
  };

  const handleAcceptButton = async (offerRow) => {
    try {
      const res = await acceptOffer(offerRow.id);
      console.log(res.data);
      setListingCancelled((prev) => !prev);
      alert(`Offer with ${offerRow.id} is accepted for the listing`);
    } catch (err) {
      console.log('Failed to accept offer.', err);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          { row.sellType === 'AUCTION'
              && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              )}
        </TableCell>
        <TableCell component="th" scope="row">
          <img src={row.nft.imageURL ? row.nft.imageURL : defaultImageURL} alt="" height="50px" width="50px" />
        </TableCell>
        <TableCell align="left">{row.nft.name}</TableCell>
        <TableCell align="left">{row.sellType}</TableCell>
        <TableCell align="left">{row.listingStatus}</TableCell>
        <TableCell align="left">{row.listingTime}</TableCell>
        <TableCell align="left"><Button variant="contained" disabled={row.offers.length > 0 || row.listingStatus !== 'NEW'} onClick={() => handleCancelButton(row)}>Cancel</Button></TableCell>
      </TableRow>
      <TableRow>
        {row.sellType === 'AUCTION'
            && (
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{margin: 1}}>
                  <Typography variant="h6" gutterBottom component="div">
                    Auction Offers
                  </Typography>
                  <Table size="small" aria-label="offers">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Amount</TableCell>
                        <TableCell align="left">Offer Initiated</TableCell>
                        <TableCell align="left">ExpirationTime</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">OfferAction</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.offers.map((offerRow) => (
                        <TableRow key={offerRow.createdOn}>
                          <TableCell align="left">
                            <div>
                              {offerRow.amount}
                              &nbsp;
                              {row.currencyType}
                            </div>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {offerRow.createdOn}
                          </TableCell>
                          <TableCell align="left">{offerRow.expirationTime}</TableCell>
                          <TableCell align="left">{offerRow.status}</TableCell>
                          <TableCell align="left"><Button variant="contained" disabled={offerRow.status !== 'NEW'} onClick={() => handleAcceptButton(offerRow)}>{offerRow.status === 'NEW' ? 'ACCEPT' : offerRow.status}</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
            )}
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currencyType: PropTypes.string.isRequired,
    sellType: PropTypes.string.isRequired,
    listingStatus: PropTypes.string.isRequired,
    listingTime: PropTypes.string.isRequired,
    nft: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        assetURL: PropTypes.string.isRequired,
        lastRecordedTime: PropTypes.string.isRequired,
        createdOn: PropTypes.string.isRequired,
      }),
    ).isRequired,
    offers: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        createdOn: PropTypes.string.isRequired,
        expirationTime: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setListingCancelled: PropTypes.func.isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );
  const [listingCancelled, setListingCancelled] = useState(false);
  const [isFetch, setIsFetch] = React.useState(false);

  const getData = async () => {
    const res = await getAllListings(user.id);
    setRows(res.data);
    setIsFetch(true);
  };

  useEffect(() => {
    getData();
    setListingCancelled(false);
  }, [listingCancelled]);

  return (
    <>
      {
      isFetch ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">NFT Image</TableCell>
                <TableCell align="left">NFT Name</TableCell>
                <TableCell align="left">Sale Type</TableCell>
                <TableCell align="left">Listing Status</TableCell>
                <TableCell align="left">Listing Time</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} setListingCancelled={setListingCancelled} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ width: 800 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )
    }
    </>
  );
}
