/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import { LockOutlined } from '@mui/icons-material';
import {
  Box, Button, Divider, Grid, IconButton, Link, TextField, Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import CLIENT_ID from '../../config';

function Register({
  onSuccess, onFailure, login, setLogin,
}) {
  const {
    register, handleSubmit, formState: {
      errors, isSubmitted,
    }, watch,
  } = useForm({
    defaultValues: {
      registerEmail: '',
      nickName: '',
      password: '',
      password_repeat: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const handleLoginType = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const onSubmitRegister = (data) => {
    const userData = {
      username: data.registerEmail,
      nickname: data.nickName,
      password: data.password,
    };
    console.log(errors);
    console.log(userData);
    console.log(isSubmitted);
    // TODO - Write axios calls to handle api calls to backend server.
  };

  React.useEffect(() => {
    console.log('Validating');
  }, []);

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
            {errors?.registerEmail?.type === 'required' && (
            <div style={{
              display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
            }}
            >
              {' '}
              <Typography variant="p" component="p" display="inline" alignContent="center" marginLeft="2px">
                User Name is required
                {' '}
              </Typography>
            </div>
            )}
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
              {...register('nickName', { required: 'true', pattern: { value: /^[0-9a-zA-Z]+$/, message: 'Pattern did not match' } })}
              error={errors?.nickName?.type === 'required' || errors?.nickName?.type === 'pattern'}
            />
            {errors?.nickName?.type === 'required' && (
            <div style={{
              display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
            }}
            >
              {' '}
              <Typography variant="p" component="p" display="inline" alignContent="center" marginLeft="2px">
                Nick name is required
                {' '}
              </Typography>
            </div>
            )}

            {errors?.nickName?.type === 'pattern' && (
            <div style={{
              display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
            }}
            >
              {' '}
              <Typography
                variant="p"
                component="p"
                display="inline"
                alignContent="center"
                marginLeft="2px"
              >
                {errors?.nickName?.message}
                {' '}
              </Typography>
            </div>
            )}
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
              {...register('password', {
                required: 'true',
              })}
              error={errors?.password?.type === 'required'}
            />
            {errors?.password?.type === 'required' && (
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
          </Grid>

          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_repeat"
              label="Retype Password"
              type="password"
              id="password_repeat"
              {...register('password_repeat', {
                required: 'true',
                validate: (value) => (value === password.current || 'Passwords do not match'),
              })}
              error={errors?.password_repeat?.type === 'required' || errors?.password_repeat?.type === 'validate'}
            />
            {errors?.password_repeat?.type === 'required' && (
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

            {errors?.password_repeat?.type === 'validate' && (
              <div style={{
                display: 'flex', alignContent: 'center', color: 'red', margin: '5px',
              }}
              >
                <Typography variant="p" component="p" display="inline" alignContent="center" marginLeft="2px">
                  {errors.password_repeat.message}
                </Typography>
              </div>
            ) }

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
              Already have an account?Login
            </Link>
          </Grid>
        </Grid>

      </Box>
    </Grid>

  );
}

export default Register;
