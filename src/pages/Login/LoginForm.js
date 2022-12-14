/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import { LockOutlined } from '@mui/icons-material';
import {
  Alert,
  Box, Button, Divider, Grid, IconButton, Link, TextField, Typography,
} from '@mui/material';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { isEditableInput } from '@testing-library/user-event/dist/utils';
import jwtDecode from 'jwt-decode';
import CLIENT_ID from '../../config';
import { logIn } from '../../api/AuthRequest';

function LoginForm({
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
  const [isError, setIsError] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState('');
  const navigate = useNavigate();

  const handleLoginType = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const onSubmitLogin = async (data) => {
    const userData = {
      username: data.loginEmail,
      password: data.loginPassword,
    };
    // console.log(userData);
    logIn(userData)
      .then((res) => {
        console.log(res);
        localStorage.setItem('auth', 'local');
        if (!res.data.enabled) {
          navigate('/account/activation');
        } else {
          localStorage.setItem('userObj', JSON.stringify(res.data));
          localStorage.setItem('access-token', res.data.jwt);
          navigate('/user');
        }
        // console.log(jwtDecode(res.data.jwt));
      })
      .catch((err) => {
        alert('Failed to login.');
        console.log(err.response.data.message);
        setIsError(true);
        setErrMessage(err.response.data.message);
      });
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
        {isError && <Alert severity="error" onClose={() => setIsError(false)}>{errMessage}</Alert>}
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

        {/** Form Login */}
        <form onSubmit={handleSubmit(onSubmitLogin)}>

          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="loginEmail"
              label="Email Address"
              name="loginEmail"
              autoFocus
              type="email"
              {...register('loginEmail', { required: 'true' })}
              error={errors?.loginEmail?.type === 'required'}
            />
            {errors?.loginEmail?.type === 'required' && (
            <div style={{
              display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
            }}
            >
              {' '}
              <Typography variant="p" component="p" display="inline" alignContent="center" marginLeft="2px">
                Email is required
                {' '}
              </Typography>
            </div>
            )}

            {/* {errors?.email?.type === 'pattern' && (
                <div style={{
                  display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
                }}
                >
                  {' '}
                  <Typography variant="p"
                  component="p" display="inline" alignContent="center" marginLeft="2px">
                    Not a valid email
                    {' '}
                  </Typography>
                </div>
                )} */}
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="loginPassword"
              label="Password"
              type="password"
              id="loginPassword"
              {...register('loginPassword', { required: 'true', minLength: 8 })}
              error={errors?.loginPassword?.type === 'required' || errors?.loginPassword?.type === 'minLength'}
            />
            {errors?.loginPassword?.type === 'required' && (
            <div style={{
              display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
            }}
            >
              {' '}
              <Typography variant="p" component="p" display="inline" alignContent="center" marginLeft="2px">
                Password is required
                {' '}
              </Typography>
            </div>
            )}
            {errors?.loginPassword?.type === 'minLength' && (
            <div style={{
              display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
            }}
            >
              {' '}
              <Typography variant="p" component="p" display="inline" alignContent="center" marginLeft="2px">
                Password length should be min of 8 characters
                {' '}
              </Typography>
            </div>
            )}
          </Grid>

          <Grid item display="grid" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: '10px', width: '400px', marginTop: '10px' }}
              type="submit"
            >
              LOGIN
            </Button>

          </Grid>

        </form>

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

  );
}

export default LoginForm;
