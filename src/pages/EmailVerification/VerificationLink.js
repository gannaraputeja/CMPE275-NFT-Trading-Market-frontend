/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import {
  Alert, Button, CircularProgress, Grid,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerificationLink() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = React.useState('loading');
  const [showLoginButton, setShowLoginButton] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsVerified('sucess');
    }, 5000);
  }, [isVerified]);

  if (isVerified === 'sucess') {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <Grid container display="grid" justifyContent="center" alignContent="center" height="500px" borderColor="Background">
      <Alert
        icon={isVerified === 'loading' ? <CircularProgress color="info" fontSize="large" />
          : (isVerified === 'sucess' ? <CheckCircleOutline color="success" fontSize="large" /> : <ErrorOutline color="error" fontSize="large" />)}
        severity={isVerified === 'loading' ? 'info' : (isVerified === 'sucess' ? 'success' : 'error')}
        sx={{
          width: 700, height: 60, fontSize: 30, alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
        }}
      >
        {isVerified === 'loading' ? 'Please wait accout is being verified !!!'
          : (isVerified === 'sucess' ? 'Account Verified, Redirecting to Homepage' : 'Account could not be verified')}
      </Alert>
      <Grid display="flex" justifyContent="space-evenly">
        {
            isVerified === 'failed' && (
            <>
              <Grid item display="flex">

                <Button
                  variant="contained"
                  size="medium"
                  disableElevation
                  onClick={() => {
                    alert('Verificaton email sent sucessfully');
                    navigate('/');
                  }}
                >
                  RESEND VERIFICATION EMAIL
                </Button>
              </Grid>
              <Grid item display="flex">

                <Button
                  variant="contained"
                  size="medium"
                  disableElevation
                  onClick={() => {

                  }}
                >
                  GO BACK TO LOGIN
                  {' '}

                </Button>
              </Grid>

            </>
            )
          }
      </Grid>
    </Grid>
  );
}

export default VerificationLink;
