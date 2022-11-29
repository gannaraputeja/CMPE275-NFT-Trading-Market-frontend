/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  Box,
  Button,
  Container, Divider, Grid, InputLabel, TextField,
} from '@mui/material';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import CLIENT_ID from '../../config';

function Login({ onSuccess, onFailure }) {
  return (
    <Container>
      <Grid container display="grid" justifyContent="center" alignContent="center" height="500px" borderColor="Background">
        <Box sx={{ border: 0, borderColor: 'primary.main', padding: '100px' }}>
          <Grid item>
            <InputLabel style={{ marginBottom: '5px' }}><strong>User Name</strong></InputLabel>
            <TextField
              style={{ marginBottom: '20px' }}
              type="email"
              variant="outlined"
              size="small"
              required
            />

          </Grid>
          <Grid item>
            <InputLabel style={{ marginBottom: '5px' }}><strong>Password</strong></InputLabel>
            <TextField
              style={{ marginBottom: '20px' }}
              type="password"
              variant="outlined"
              size="small"
              required
            />

          </Grid>
          <Grid item display="grid" justifyContent="center">
            <Button variant="contained" color="primary" fullWidth="true" sx={{ marginBottom: '10px' }}>LOGIN</Button>

          </Grid>
          <Divider />
          <Grid item sx={{ marginTop: '10px' }} display="grid" justifyContent="center">
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy="single_host_origin"
              style={{ marginTop: '100px', marginLeft: '200px' }}
              isSignedIn={false}
            />

          </Grid>

        </Box>
      </Grid>
    </Container>
  );
}

export default Login;
