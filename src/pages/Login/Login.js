/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import CLIENT_ID from '../../config';

function Login({ onSuccess, onFailure }) {
  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      style={{ marginTop: '100px', marginLeft: '200px' }}
      isSignedIn={false}
    />
  );
}

export default Login;
