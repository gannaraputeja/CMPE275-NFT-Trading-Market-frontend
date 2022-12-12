/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import {
  Alert, Button, CircularProgress, Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../../api/AuthRequest';

function VerificationLink() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isVerified, setIsVerified] = React.useState('loading');
  const [showLoginButton, setShowLoginButton] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState('Account could not be verified');

  React.useEffect(() => {
    setTimeout(() => {
      verifyEmail(token).then((res) => {
        setIsVerified('success');
      }).catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
        setIsVerified('error');
      }).finally(() => {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });
    }, 1000);
  }, []);

  return (
    <Grid container display="grid" justifyContent="center" alignContent="center" height="500px" borderColor="Background">
      <Alert
        icon={isVerified === 'loading' ? <CircularProgress color="info" fontSize="large" />
          : (isVerified === 'success' ? <CheckCircleOutline color="success" fontSize="large" /> : <ErrorOutline color="error" fontSize="large" />)}
        severity={isVerified === 'loading' ? 'info' : (isVerified === 'success' ? 'success' : 'error')}
        sx={{
          width: 700, height: 60, fontSize: 30, alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
        }}
      >
        {isVerified === 'loading' ? 'Please wait account is being verified !!!'
          : (isVerified === 'success' ? 'Account Verified, Redirecting to Homepage' : errorMessage)}
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
                    alert('Verificaton email sent successfully');
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
