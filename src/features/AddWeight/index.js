import React, {useState} from 'react';
import {Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogActions,
    TextField,
    DialogContent
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import axios from "axios";
import {convertLbsToKs} from "../../utils/convert";

function AddWeight ({user, token, fetchStatsData, fetchChartData, selectedTab}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [weight, setWeight] = useState(null);
    const [entryDate, setEntryDate] = useState(new Date());

    const handleClose = () => {
        setWeight(null);
        setEntryDate(new Date());
        setIsDialogOpen(false);
    }

    const handleSubmit = async () => {
        // TODO error handle
        if(!weight || !entryDate){
            console.log("Missing info");
            return;
        }

        // convert to kg
        const entryWeight = convertLbsToKs(weight);

        const axiosSubmitConfig = {
            method: "POST",
            url: `${process.env.REACT_APP_WEIGHT_TRACKER_API}/entry`,
            headers: {
                'x-auth-token': token
            },
            data:{
                username: user,
                weight: entryWeight,
                entryDate
            }
        }

        try {
            await axios(axiosSubmitConfig);
            await fetchStatsData();
            await fetchChartData('7');
            handleClose();
        } catch (e) {
            console.log(e.message);
            // TODO error handle better
            handleClose();
        }
    }



    return (
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              mt={4}>
            <Grid item xs={12}>
                <Button onClick={() => setIsDialogOpen(true)}>Add Weight</Button>
            </Grid>
            <Dialog onClose={handleClose} open={isDialogOpen}>
                <DialogTitle>Add Weight</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="weight"
                        label="Weight (lbs)"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <Grid container mt={3}>
                        <DatePicker
                            label="Entry Date"
                            value={entryDate}
                            onChange={(newValue) => {
                                setEntryDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default AddWeight;
