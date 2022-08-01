import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {selectToken, selectUser} from "../Login/loginSlice";
import { get } from 'lodash';
import axios from "axios";
import {Grid, Typography, Item} from "@mui/material";
import {convertMetricToImperial} from "../../utils/convert";

function WeightChart () {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [weightData, setWeightData] = useState([]);
    const [stats, setStats] = useState(null);

    const round = (value, precision) => {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;

    }

    const fetchData = async (time) => {
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

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              mt={4}>
            <Grid item xs={12}>
                <Typography variant='h3'>{round(get(weightData, 'weight', 0), 1)} lbs</Typography>
            </Grid>
            <Grid container mt={4}>
                <Grid item xs={4}>
                    <Typography align={"center"}>BMR</Typography>
                    <Typography align={"center"}>{round(get(stats, "BMR", 0), 1)}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align={"center"}>TDEE</Typography>
                    <Typography align={"center"}>{round(get(stats, "TDEE", 0), 1)}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align={"center"}>BMI</Typography>
                    <Typography align={"center"}>{round(get(stats, "BMI", 0) ,1)}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default WeightChart;
