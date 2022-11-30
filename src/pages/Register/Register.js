/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import { LockOutlined } from '@mui/icons-material';
import {
  Box, Button, Divider, Grid, IconButton, Link, TextField, Typography,
} from '@mui/material';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import CLIENT_ID from '../../config';

function Register({
  onSuccess, onFailure, login, setLogin,
}) {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      registerEmail: '',
      nickName: '',
      registerPassword1: '',
      registerPassword2: '',
    },
  });

  const handleLoginType = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const onSubmitRegister = (data) => {
    const userData = {
      username: data.registerEmail,
      nickname: data.nickName,
      password: data.registerPassword1,
    };
    console.log(userData);
    // TODO - Write axios calls to handle api calls to backend server.
  };
  return (
    <Grid
      container
      display="grid"
      justifyContent="center"
      alignContent="center"
      height="500px"
      borderColor="Background"
    >
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

        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="registerEmail"
              label="User Name"
              name="registerEmail"
              type="email"
              autoFocus
              {...register('registerEmail', { required: 'true' })}
              error={errors?.registerEmail?.type === 'required'}
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
              type="text"
              {...register('nickName', { required: 'true' })}
              error={errors?.nickName?.type === 'required'}
            />
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="registerPassword1"
              label="Password"
              type="password"
              id="registerPassword1"
              {...register('registerPassword1', { required: 'true' })}
              error={errors?.registerPassword1?.type === 'required'}
            />

          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="registerPassword2"
              label="Retype Password"
              type="password"
              id="registerPassword2"
              {...register('registerPassword2', { required: 'true' })}
              error={errors?.registerPassword2?.type === 'required'}
            />

          </Grid>

          <Grid item display="grid" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: '10px', width: '400px', marginTop: '10px' }}
              type="submit"
            >
              REGISTER
            </Button>

          </Grid>
        </form>

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
            <Link href="/" variant="body2" onClick={handleLoginType}>
              Login
            </Link>
          </Grid>
        </Grid>

      </Box>
    </Grid>

  );
}

export default Register;
