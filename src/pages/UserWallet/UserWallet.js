/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import {
  Box, Button, Container, Grid, Tab, Tabs, Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function UserWallet() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Typography variant="h6">
        User Wallet
      </Typography>
      <Grid container display="flex">
        {/* <Grid item spacing={6} marginTop={4}>
          <img
            alt={localStorage.getItem('userName')}
            src={localStorage.getItem('profilePicture')}
            style={{
              border: 0, cursor: 'pointer', minHeight: '150px',
            }}
          />
        </Grid> */}
        <Grid item spacing={6} padding={2}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="BTC" {...a11yProps(0)} />
                <Tab label="ETH" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography variant="h6">
                Balance - 23.5 BTC
              </Typography>
              <Grid container display="flex" justifyContent="space-between">
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained">Withdraw</Button>

                </Grid>
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained">Deposit</Button>

                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="h6">
                Balance - 10.4 ETH
              </Typography>
              <Grid container display="flex" justifyContent="space-between">
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained">Withdraw</Button>

                </Grid>
                <Grid item style={{ padding: '5px' }}>
                  <Button variant="contained">Deposit</Button>

                </Grid>
              </Grid>
            </TabPanel>

          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserWallet;
