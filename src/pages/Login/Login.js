/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { Google, LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container, CssBaseline, Divider, FormControlLabel,
  Grid, IconButton, InputLabel, Link, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { makeStyles } from '@mui/styles';

import CLIENT_ID from '../../config';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ onSuccess, onFailure }) {
  // const classes = useStyles();

  return (
    <Container component="main" style={{ backgroundColor: '#FAF9F6', height: '100vh' }} maxWidth>

      <Grid container display="grid" justifyContent="center" alignContent="center" height="500px" borderColor="Background">
        <Grid item display="grid" justifyContent="center" marginTop={30}>
          <Typography variant="h4">
            NFT Trading Market
          </Typography>
        </Grid>
        <Box sx={{
          border: 1,
          borderColor: 'black solid',
          padding: '50px',
          width: '400px',
          marginTop: '50px',
          backgroundColor: 'white',
        }}
        >
          <Grid item display="grid" justifyContent="center">
            <IconButton>
              <LockOutlined color="primary" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item display="grid" justifyContent="center">
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

          </Grid>
          <Grid item display="grid" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: '10px', width: '400px', marginTop: '10px' }}
            >
              LOGIN
            </Button>

          </Grid>
          <Divider>
            OR
          </Divider>
          <Grid item sx={{ marginTop: '10px' }} display="grid" justifyContent="center">
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
              isSignedIn={false}
              style={{ marginTop: '100px', height: '400px' }}
            />

          </Grid>

          <Grid container display="grid" justifyContent="center">

            <Grid item style={{ marginTop: '30px' }}>
              <Link href="/register" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Grid>
    </Container>
  );
}

export default Login;
