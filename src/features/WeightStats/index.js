import React from 'react';
import { get } from 'lodash';
import {Grid, Typography} from "@mui/material";

import {round} from "../../utils/convert";

function WeightStats ({weightData, stats}) {
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

export default WeightStats;
