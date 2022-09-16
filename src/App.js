/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { get } from "lodash";
import { Box, Grid } from "@mui/material";

import { selectUser, selectToken } from "./features/Login/loginSlice";
import WeightChart from "./features/WeightChart";
import WeightStats from "./features/WeightStats";
import AddWeight from './features/AddWeight';

import { verifyToken } from "./utils/auth";
import { convertMetricToImperial, convertMetricToImperialArr } from "./utils/convert";


function App() {
  let navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [weightChartData, setWeightChartData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedTab, setSelectedTab] = useState('7');
  const [loadingChartData, setLoadingChartData] = useState(true);

  const fetchStatsData = async () => {
    const axiosConfigLastEntry = {
      method: 'GET',
      url: `${process.env.REACT_APP_WEIGHT_TRACKER_API}/entry/username/${user}/last`,
      headers: {
        'x-auth-token': token
      }
    }

    const axiosConfigStats = {
      method: 'GET',
      url: `${process.env.REACT_APP_WEIGHT_TRACKER_API}/stats/all/${user}`,
      headers: {
        'x-auth-token': token
      }
    }

    try {
      const lastResults = await axios(axiosConfigLastEntry);
      const lastData = get(lastResults, 'data', []);
      setWeightData(convertMetricToImperial(lastData));
      const statsResults = await axios(axiosConfigStats);
      const statsData = get(statsResults, 'data', null);
      setStats(statsData);
    } catch (e) {
      console.log(e.message);
    }
  }

  const fetchChartData = async (time) => {
    const axiosConfig = {
      method: 'GET',
      url: `${process.env.REACT_APP_WEIGHT_TRACKER_API}/entry/username/${user}?time=${time}`,
      headers: {
        'x-auth-token': token
      }
    }

    try {
      const results = await axios(axiosConfig);
      const data = get(results, 'data', []);
      setWeightChartData(convertMetricToImperialArr(data));
      setLoadingChartData(false);
    } catch (e) {
      console.log(e.message);
    }
  }

  const init = async () => {
    // Check if token is set
    if (!user && !token) {
      navigate("/login");
    }

    // Verify Token
    try {
      const isValid = await verifyToken(token);
      if (isValid.status !== 200) {
        return navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
      return navigate("/login");
    }

    // Fetch Data
    try {
      await fetchStatsData();
      await fetchChartData('7');
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const handleTabsChange = (e, value) => {
    setSelectedTab(value);
    fetchChartData(value);
  }

  return (
    <Box>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <WeightChart weightData={weightChartData}
          handleTabsChange={handleTabsChange}
          selectedTab={selectedTab}
          loadingChartData={loadingChartData}
        />
        <WeightStats weightData={weightData} stats={stats} />
        <AddWeight token={token}
          user={user}
          fetchStatsData={fetchStatsData}
          fetchChartData={fetchChartData}
          selectedTab={selectedTab}
        />
      </Grid>
    </Box>
  );
}

export default App;
