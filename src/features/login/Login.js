/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  login,
  selectStatus,
  selectLoggedIn,
  setStatusIdle
} from './loginSlice';
import {
  Grid,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from "react-router-dom";

export function Login () {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const status = useSelector(selectStatus);
  const loggedIn = useSelector(selectLoggedIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // TODO check exp of token
    if (loggedIn) {
      return navigate("/");
    }
  }, [loggedIn]);

  return (
    <Box>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center">
        <Grid item xs={12} mt={4}>
          <TextField
            id="outlined-required"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                dispatch(login({ username, password }))
              }
            }
            }
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <TextField
            id="outlined-required"
            label="Password"
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                dispatch(login({ username, password }))
              }
            }
            }
          />
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button
            disabled={status === 'loading'}
            onClick={() => dispatch(login({ username, password }))}
          >
            Log In
          </Button>

          <Snackbar open={status === 'rejected'} onClose={() => dispatch(setStatusIdle)}>
            <Alert onClose={() => dispatch(setStatusIdle)} severity="error" sx={{ width: '100%' }}>
              Error Logging In!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
}
