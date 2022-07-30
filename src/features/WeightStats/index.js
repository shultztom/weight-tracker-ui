import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {selectToken, selectUser} from "../Login/loginSlice";
import { get } from 'lodash';
import axios from "axios";
import {Grid, Typography} from "@mui/material";
import {convertMetricToImperial} from "../../utils/convert";

function WeightChart () {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [weightData, setWeightData] = useState([]);

    const fetchData = async (time) => {
        const axiosConfig = {
            method: 'GET',
            url: `${process.env.REACT_APP_WEIGHT_TRACKER_API}/entry/username/${user}/last`,
            headers: {
                'x-auth-token': token
            }
        }

        try {
            const results = await axios(axiosConfig);
            const data = get(results, 'data', []);
            setWeightData(convertMetricToImperial(data));
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
            <Typography variant='h3'>{Number(get(weightData, 'weight', '')).toFixed(1)} lbs</Typography>

        </Grid>
    );
}

export default WeightChart;
