/* eslint-disable no-unused-vars */
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
import { useNavigate } from 'react-router-dom';
import CLIENT_ID from '../../config';
import { signUp } from '../../api/AuthRequest';

function Register({
  onSuccess, onFailure, login, setLogin,
}) {
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: {
      errors,
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

  const onSubmitRegister = async (data) => {
    const userData = {
      username: data.registerEmail,
      firstname: data.firstname,
      lastname: data.lastname,
      nickname: data.nickName,
      password: data.password,
    };
    console.log(userData);
    signUp(userData)
      .then((res) => {
        console.log(res);
        navigate('/account/activation');
      })
      .catch((err) => {
        console.log(err);
      });
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
        padding: '10px',
        paddingTop: '10px',
        paddingBottom: '20px',
        width: '700px',
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

          <Grid container display="flex" justifyContent="space-evenly">
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
                sx={{ width: 300 }}
                {...register('registerEmail', { required: 'true' })}
                error={errors?.registerEmail?.type === 'required'}
              />
              {errors?.registerEmail?.type === 'required' && (
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
                  sx={{ fontSize: '12px' }}
                >
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
                sx={{ width: 300 }}
                {...register('nickName', { required: 'true', pattern: { value: /^[0-9a-zA-Z]+$/, message: 'Only alpha numeric characters allowed' } })}
                error={errors?.nickName?.type === 'required' || errors?.nickName?.type === 'pattern'}
              />
              {errors?.nickName?.type === 'required' && (
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
                  sx={{ fontSize: '12px' }}
                >
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
                  sx={{ fontSize: '12px' }}
                >
                  {errors?.nickName?.message}
                  {' '}
                </Typography>
              </div>
              )}
            </Grid>

          </Grid>

          <Grid container display="flex" flexDirection="row" justifyContent="space-evenly">

            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                type="text"
                sx={{ width: 300 }}
                {...register('firstname', { required: 'true', maxLength: 40 })}
                error={errors?.firstname?.type === 'required' || errors?.firstname?.type === 'pattern'}
              />
              {errors?.firstname?.type === 'required' && (
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
                  sx={{ fontSize: '12px' }}
                >
                  First name is required
                  {' '}
                </Typography>
              </div>
              )}

              {errors?.firstname?.type === 'maxLength' && (
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
                  sx={{ fontSize: '12px' }}
                >
                  maxLength exceeded.
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
                id="lastname"
                label="Last Name"
                name="lastname"
                type="text"
                sx={{ width: 300 }}
                {...register('lastname', { required: 'true', maxLength: 40 })}
                error={errors?.lastname?.type === 'required' || errors?.lastname?.type === 'maxLength'}
              />
              {errors?.lastname?.type === 'required' && (
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
                  sx={{ fontSize: '12px' }}
                >
                  Nick name is required
                  {' '}
                </Typography>
              </div>
              )}

              {errors?.lastname?.type === 'maxLength' && (
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
                  sx={{ fontSize: '12px' }}
                >
                  maxLength exceeded.
                </Typography>
              </div>
              )}
            </Grid>
          </Grid>

          <Grid container display="flex" justifyContent="space-evenly">
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
                sx={{ width: 300 }}
                {...register('password', {
                  required: 'true',
                  minLength: {
                    value: 8, message: 'Password length should be min of 8 characters',
                  },
                })}
                error={errors?.password?.type === 'required' || errors?.password?.type === 'minLength'}
              />
              {errors?.password?.type === 'required' && (
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
                  sx={{ fontSize: '12px' }}
                >
                  Password is required
                  {' '}
                </Typography>
              </div>
              )}

              {errors?.password?.type === 'minLength' && (
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
                  sx={{ fontSize: '12px' }}
                >
                  {errors?.password?.message}
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
                sx={{ width: 300 }}
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
                <Typography
                  variant="p"
                  component="p"
                  display="inline"
                  alignContent="center"
                  marginLeft="2px"
                  sx={{ fontSize: '12px' }}
                >
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
                <Typography
                  variant="p"
                  component="p"
                  display="inline"
                  alignContent="center"
                  marginLeft="2px"
                  sx={{ fontSize: '12px' }}
                >
                  {errors?.password_repeat?.message}
                </Typography>
              </div>
              ) }

            </Grid>
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
