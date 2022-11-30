/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { LockOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container, Divider,
  Grid, IconButton, Link, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { GoogleLogin } from 'react-google-login';

import CLIENT_ID from '../../config';

function Login({ onSuccess, onFailure }) {
  const [login, setLogin] = React.useState(true);
  const handleLoginType = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  return (
    <Container component="main" style={{ backgroundColor: '#FAF9F6', height: '100vh' }} maxWidth>

      {login ? (
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
            paddingTop: '10px',
            paddingBottom: '20px',
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
                <Link href="/" variant="body2" onClick={handleLoginType}>
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Grid>
      )
        : (
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
              paddingTop: '10px',
              paddingBottom: '20px',
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
                  Register
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                />
              </Grid>

              <Grid item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nickName"
                  label="Nick Name"
                  name="nickName"
                  autoComplete="nickName"
                  type="text"
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

              <Grid item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Retype Password"
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
                  REGISTER
                </Button>

              </Grid>
              <Divider>
                OR
              </Divider>
              <Grid item sx={{ marginTop: '10px' }} display="grid" justifyContent="center">
                <GoogleLogin
                  clientId={CLIENT_ID}
                  buttonText="Sign up with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy="single_host_origin"
                  isSignedIn={false}
                  style={{ marginTop: '100px', height: '400px' }}
                />

              </Grid>

              <Grid container display="grid" justifyContent="center">

                <Grid item style={{ marginTop: '30px' }}>
                  <Link href="/register" variant="body2" onClick={handleLoginType}>
                    Login
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Grid>
        )}

    </Container>
  );
}

export default Login;
