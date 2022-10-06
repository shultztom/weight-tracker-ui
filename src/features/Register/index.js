/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    useSelector
} from 'react-redux';

import {
    Grid,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    Typography,
    FormControl
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import {selectLoggedIn} from "../Login/loginSlice";
import {DatePicker} from "@mui/x-date-pickers";

export function Register() {
    let navigate = useNavigate();

    const loggedIn = useSelector(selectLoggedIn);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [heightFT, setHeightFT] = useState("");
    const [heightIN, setHeightIN] = useState("");
    const [birthday, setBirthday] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [gender, setGender] = useState("");

    const [hasValidationErrors, setHasValidationErrors] = useState(false);

    useEffect(() => {
        // TODO check exp of token
        if (loggedIn) {
            return navigate("/");
        }
    }, [loggedIn]);

    const validate = () => {
        // TODO improve
        const errors = [];
        if(!username){
            errors.push('username');
        }
        if(!password){
            errors.push('password');
        }
        if(!heightFT){
            errors.push('heightFT');
        }
        if(!heightIN){
            errors.push('heightIN');
        }
        if(!birthday){
            errors.push('birthday');
        }
        if(!activityLevel){
            errors.push('activityLevel');
        }
        if(!gender){
            errors.push('gender');
        }

        if(errors.length === 0){
            setHasValidationErrors(false);
            return false;
        }
        setHasValidationErrors(true);
        return true;
    }

    const register = () => {
        // Check errors
        const hasValidationErrors = validate();
        if(hasValidationErrors){
            return;
        }

        // Create user in auth-api
        // TODO

        // Create user in weight-tracker-api
        // TODO

    }

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
                    />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <TextField
                        id="outlined-required"
                        label="Password"
                        type={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid container mt={2}
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justifyContent="center">
                        <Box sx={{ minWidth: '10%' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="heightFT"
                                    id="heightFT"
                                    value={heightFT}
                                    onChange={(e) => setHeightFT(e.target.value)}
                                >
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                </Select>
                                <Typography align="right">ft</Typography>
                            </FormControl>
                        </Box>
                        <Box minWidth={'4%'}></Box>
                        <Box sx={{ minWidth: '10%' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="heightIN"
                                    id="heightIN"
                                    value={heightIN}
                                    onChange={(e) => setHeightIN(e.target.value)}
                                >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                </Select>
                                <Typography align="right">in</Typography>
                            </FormControl>
                        </Box>
                </Grid>
                <Grid item xs={12} mt={2}>
                    <DatePicker
                        label="Birthday"
                        value={birthday}
                        onChange={(newValue) => {
                            setBirthday(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid container mt={2}
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justifyContent="center">
                    <Box minWidth={'24%'}>
                        <FormControl fullWidth>
                            <Select
                                labelId="activityLevel"
                                id="activityLevel"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                displayEmpty={true}
                                renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : 'Activity Level'}
                            >
                                <MenuItem value={"sedentary"}>Sedentary</MenuItem>
                                <MenuItem value={"lightlyActive"}>Lightly Active</MenuItem>
                                <MenuItem value={"moderatelyActive"}>Moderately Active</MenuItem>
                                <MenuItem value={"veryActive"}>Very Active</MenuItem>
                                <MenuItem value={"extraActive"}>Extra Active</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid container mt={2}
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justifyContent="center">
                    <Box minWidth={'24%'}>
                        <FormControl fullWidth>
                            <Select
                                labelId="gender"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                displayEmpty={true}
                                renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : 'Gender'}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={1}>
                    <Grid item xs={12} textAlign='center'>
                        <Button
                            onClick={() => register()}
                        >
                            Register
                        </Button>
                    </Grid>

                    <Snackbar open={hasValidationErrors} onClose={() => setHasValidationErrors(false)}>
                        <Alert onClose={() => setHasValidationErrors(false)} severity="error" sx={{ width: '100%' }}>
                            Missing Form Info!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Box>
    );
}
