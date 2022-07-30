import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {selectToken, selectUser} from "../Login/loginSlice";
import { get } from 'lodash';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";
import {Grid, Tabs, Tab} from "@mui/material";
import {convertMetricToImperialArr} from "../../utils/convert";

function WeightChart () {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [weightData, setWeightData] = useState([]);
    const [selectedTab, setSelectedTab] = useState('7');

    const fetchData = async (time) => {
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
            setWeightData(convertMetricToImperialArr(data));
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleTabsChange = (e, value) => {
        setSelectedTab(value);
        fetchData(value);
    }

    useEffect(() => {
        fetchData('7')
    }, []);

    return (
        <Grid container>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weightData}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <Area dataKey="weight" stroke="#2451B7" fill="url(#color)" />

                    <XAxis
                        dataKey="entryDate"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => {
                            const date = new Date(str);
                            const userTimezoneOffset = date.getTimezoneOffset() * 60000;
                            const datePlusTZ = new Date(date.getTime() + userTimezoneOffset);
                            return `${datePlusTZ.getMonth() + 1}/${datePlusTZ.getDate()}/${datePlusTZ.getFullYear()}`;
                        }}
                    />

                    <YAxis
                        datakey="weight"
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={(number) => `${number} lbs`}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabsChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab value="7" label="Week" />
                    <Tab value="30" label="Month" />
                    <Tab value="365" label="Year" />
                    <Tab value="-1" label="All" />
                </Tabs>
            </Grid>
        </Grid>
    );
}

function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="tooltip">
                <h4>{get(payload, '[0].payload.entryDate', '')}</h4>
                <p>{Number(get(payload, '[0].payload.weight', '')).toFixed(1)} lbs</p>
            </div>
        );
    }
    return null;
}

export default WeightChart;
