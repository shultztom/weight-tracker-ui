import React from 'react';
import { get } from 'lodash';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Grid, Tabs, Tab, CircularProgress } from "@mui/material";

function WeightChart({ weightData, handleTabsChange, selectedTab, loadingChartData }) {
    const calculateYAxis = (x, bound) => {
        let roughValue;
        if (bound === 'upper') {
            roughValue = x + 5;
        } else {
            roughValue = x - 5;
        }

        return Math.round(roughValue / 5) * 5;
    }

    return (
        <Grid container>
            {loadingChartData && (
                <Grid container
                    mt={2}
                    spacing={0}
                    direction="column"
                    alignItems="center">
                    <CircularProgress />
                </Grid>
            )}
            {!loadingChartData && (
                <React.Fragment>
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
                                tickFormatter={(number) => `${number} lbs`}
                                type="number"
                                domain={[dataMin => (calculateYAxis(dataMin, 'lower')), dataMax => (calculateYAxis(dataMax, 'upper'))]}
                                tickCount={5}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <CartesianGrid opacity={0.1} vertical={false} />
                        </AreaChart >
                    </ResponsiveContainer >
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
                </React.Fragment >
            )
            }
        </Grid >
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
