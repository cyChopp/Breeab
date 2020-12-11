import DateFnsUtils from "@date-io/date-fns";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import {userAPI} from '../../api/restAPI'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import  setUserInfoThunk  from "../../redux/profile-reducer";
import { connect } from "react-redux";

const PopUpChangeInfo = (props) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());

  

  const { register, handleSubmit, errors, control } = useForm();

  const onSave = (data) => {
    console.log(props.currentUserId,'UP uid');
    
    props.setUserInfoThunk(data.name,data.status,data.location,data.date,props.email,props.username,props.currentUserId);

  };
  const handleDate = (date) => {
    alert(date);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSave)}>
        <DialogTitle id="form-dialog-title">Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change your personal information.
          </DialogContentText>
          
          <TextField
          //  defaultValue={props.status}
            value={props.status}
            inputRef={register}
            name="status"
            variant="outlined"
            autoFocus
            margin="dense"
            id="status"
            label="Status"
            type="text"
            fullWidth
            InputProps={{ className: "dialog__Input" }}
          />
          <TextField
            // defaultValue={props.fullName}
            value={props.fullName}
            inputRef={register}
            name="name"
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="Full name"
            type="text"
            fullWidth
            InputProps={{ className: "dialog__Input" }}
          />
          <TextField
            // defaultValue={props.location}
            value={props.location}
            inputRef={register}
            name="location"
            variant="outlined"
            autoFocus
            margin="dense"
            id="locatiob"
            label="Location"
            type="text"
            fullWidth
            InputProps={{ className: "dialog__Input" }}
          />

          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <Controller
                  as={KeyboardDatePicker}
                  control={control}
                  defaultValue={"12/12/2020"}
                  inputRef={register}
                  value={props.date}
                  name="date"
                  fullWidth
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  noValidate
                  onChange={handleDate}
                  InputProps={{ className: "dialog__Input" }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={props.handleClose}
            type="submit"
            color="primary"

          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

// export default PopUpChangeInfo;
const mapStateToProps = (state) => ({
  // fullName: state.auth.fullName,
  // status: state.auth.status,
  // location: state.auth.location,
  // date: state.auth.date,
});

export default PopUpChangeInfo;
{
  /* <KeyboardDatePicker
                  defaultValue={'12/12/2020'}
                  inputRef={register}
                    value={selectedDate}
                    name="date"
                    fullWidth
                    
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    noValidate
                    onChange={handleDate}
                    InputProps={{ className: "dialog__Input" }}
                  /> */
}
