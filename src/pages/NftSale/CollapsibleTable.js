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
import {getAllListings} from '../../api/WalletRequest';

function Row(props) {
  const { row } = props;
  const defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/nft-trading-market-7e98b.appspot.com/o/images%2FNFT_marketplace.ico?alt=media&token=efcfd069-673b-4258-ba2f-e37a13819d8e';
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img src={row.nft.imageURL ? row.nft.imageURL : defaultImageURL} alt="" height="50px" width="50px" />
        </TableCell>
        <TableCell align="left">{row.sellType}</TableCell>
        <TableCell align="left">{row.listingStatus}</TableCell>
        <TableCell align="left">{row.listingTime}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Auction Offers
              </Typography>
              <Table size="small" aria-label="offers">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">createdOn</TableCell>
                    <TableCell align="left">ExpirationTime</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.offers.map((offerRow) => (
                    <TableRow key={offerRow.createdOn}>
                      <TableCell align="left">{offerRow.amount}</TableCell>
                      <TableCell component="th" scope="row">
                        {offerRow.createdOn}
                      </TableCell>
                      <TableCell align="left">{offerRow.expirationTime}</TableCell>
                      <TableCell align="left">{offerRow.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
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
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [user] = useState(
    localStorage.getItem('userObj') ? JSON.parse(localStorage.getItem('userObj')) : { },
  );

  const getData = async () => {
    const res = await getAllListings(user.id);
    setRows(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">NFT Image</TableCell>
            <TableCell align="left">Sale Type</TableCell>
            <TableCell align="left">Listing Status</TableCell>
            <TableCell align="left">Listing Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
