/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import {
  Box, Button, Container, Grid, Paper, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

function Profile() {
  const [profileImg, setProfileImg] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [nickName, setNickname] = React.useState('');
  const [updateNicknameBtn, setUpdateNicknameBtn] = React.useState(true);

  React.useEffect(() => {
    setProfileImg(localStorage.getItem('profilePicture'));
    setUserName(localStorage.getItem('userName'));
    setNickname(localStorage.getItem('nickName'));
  }, []);

  const updateNickname = (e) => {
    setUpdateNicknameBtn(false);
    setNickname(e.target.value);
  };

  const submitNickname = () => {
    console.log(nickName);
    setUpdateNicknameBtn(true);
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid> */}
          <Grid item xs={4}>
            <img alt="#" src={profileImg} />
          </Grid>
          <Grid item xs={8}>
            {/* <Item>xs=8</Item> */}
            <Typography>User Details</Typography>
            <Grid sx={{display: 'block', padding: '5px'}}>
              <TextField
                id="filled-basic"
                label="User Name"
                defaultValue={userName}
                variant="filled"
                disabled
              />
            </Grid>
            <Grid sx={{display: 'block', padding: '5px'}}>
              <TextField
                id="filled-basic"
                label="Nick Name"
                variant="filled"
                defaultValue={nickName}
                disabled={updateNicknameBtn}
                onChange={updateNickname}
              />

              <Button
                sx={{marginLeft: '5px', marginY: 'auto'}}
                type="button"
                variant="contained"
                size="small"
                onClick={updateNickname}
                disabled={!updateNicknameBtn}
              >
                EDIT
              </Button>

              <Button
                sx={{marginLeft: '5px', marginY: 'auto'}}
                type="button"
                variant="contained"
                size="small"
                onClick={submitNickname}
                disabled={updateNicknameBtn}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid sx={{display: 'block', padding: '5px'}}>
              <TextField
                id="filled-basic"
                label="*********"
                variant="filled"
                disabled
                type="password"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Profile;
