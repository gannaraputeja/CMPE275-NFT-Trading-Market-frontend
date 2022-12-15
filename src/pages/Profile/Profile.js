/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import {
  Box, Button, Container, Grid, Input, Paper, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import jwt_decode from 'jwt-decode';
import { updatePassword, updateNickName } from '../../api/userProfile';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

function Profile() {
  const [profileImg, setProfileImg] = React.useState(() => localStorage.getItem('profilePicture'));
  const [userName, setUserName] = React.useState(() => localStorage.getItem('userName'));
  const [nickName, setNickname] = React.useState(() => localStorage.getItem('nickName'));
  const [password, setPassword] = React.useState();
  const [updateNicknameBtn, setUpdateNicknameBtn] = React.useState(true);
  const [updatePwdBtn, setUpdatePwdBtn] = React.useState(true);

  React.useEffect(() => {
    setProfileImg(localStorage.getItem('profilePicture'));
    setUserName(localStorage.getItem('userName'));
    setNickname(localStorage.getItem('nickName'));
    // console.log(localStorage.getItem('nickName'));
    // console.log(localStorage.getItem('userName').length === 0
    // ? '' : localStorage.getItem('userName').toLocaleLowerCase());
  }, []);

  const updateNickname = (e) => {
    setUpdateNicknameBtn(false);
    setNickname(e.target.value);
  };

  const updatePwd = (e) => {
    setUpdatePwdBtn(false);
    setPassword(e.target.value);
  };

  const submitNickname = async () => {
    console.log(nickName);
    setUpdateNicknameBtn(true);
    const data = {
      id: localStorage.getItem('id'),
      nickname: nickName,
    };
    try {
      const res = await updateNickName(data);
      alert('Nick Name updated');
    } catch (err) {
      alert('Nick Name could not be updated');
      return err;
    }
    return data;
  };

  const submitNewPwd = async () => {
    console.log(password);
    setUpdatePwdBtn(true);
    const data = {
      id: localStorage.getItem('id'),
      password,
    };
    try {
      const res = await updatePassword(data);
      alert('Password updated');
    } catch (err) {
      alert('Password could not be updated');
      return err;
    }
    return data;
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
                InputProps={{
                  readOnly: true,
                }}
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

              {/* <TextField
                disabled={updateNicknameBtn}
                id="filled-disabled"
                label="Disabled"
                variant="filled"
                defaultValue={nickName}
                onChange={updateNickname}
              /> */}

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
                label="Password"
                variant="filled"
                type="password"
                disabled={updatePwdBtn}
                defaultValue={password}
                onChange={updatePwd}
              />
              <Button
                sx={{marginLeft: '5px', marginY: 'auto'}}
                type="button"
                variant="contained"
                size="small"
                onClick={updatePwd}
                disabled={!updatePwdBtn}
              >
                EDIT
              </Button>
              <Button
                sx={{marginLeft: '5px', marginY: 'auto'}}
                type="button"
                variant="contained"
                size="small"
                onClick={submitNewPwd}
                disabled={updatePwdBtn}
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Profile;
