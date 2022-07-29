/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "./features/Login/loginSlice";
import { verifyToken } from "./utils/auth";
import WeightChart from "./features/WeightChart";
import {Box, Grid} from "@mui/material";


function App () {
  let navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const init = async () => {
    // Check if token is set
    if (!user && !token) {
      navigate("/login");
    }

    // Verify Token
    try {
      const isValid = await verifyToken(token);
      if(isValid.status !== 200){
        return navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
      return navigate("/login");
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
      >
        <WeightChart />
      </Grid>
    </Box>
  );
}

export default App;
