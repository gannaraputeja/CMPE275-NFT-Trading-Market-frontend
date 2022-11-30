/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {

  Container,
} from '@mui/material';
import React from 'react';
import Register from '../Register/Register';
import LoginForm from './LoginForm';

function Login({ onSuccess, onFailure }) {
  const [login, setLogin] = React.useState(true);

  return (
    <Container
      component="main"
      style={{
        backgroundColor: '#FAF9F6',
        height: '100vh',
      }}
      maxWidth
    >

      {login ? (
        <LoginForm
          onSuccess={onSuccess}
          onFailure={onFailure}
          login={login}
          setLogin={setLogin}
        />
      )
        : (
          <Register
            onSuccess={onSuccess}
            onFailure={onFailure}
            login={login}
            setLogin={setLogin}
          />
        )}

    </Container>
  );
}

export default Login;
