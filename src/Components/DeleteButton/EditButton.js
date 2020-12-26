import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles,
} from "@material-ui/core";
import "./EditButton.css";

import React, { useState } from "react";
import db from "../../firebase";

const TextFieldCustomized = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#c2164f",
    },
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#c2164f",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "&& .MuiInput-root:hover::before": {
      borderBottomColor: "white",
    },
  },
})(TextField);


const EditButton = (props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(props.postText);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };
  const onUpdate = () => {
    db.firestore()
      .collection("posts")
      .doc(props.currentUserId)
      .collection('userPosts')
      .doc(props.post.id)
      .set({ ...props.post, text });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle
          id="form-dialog-title"
          className="dialog__Content"
        >
          Edit Post
        </DialogTitle>
        <DialogContent className="dialog__Content">
          {/* <DialogContentText></DialogContentText> */}
          <TextFieldCustomized
            autoFocus
            defaultValue={props.post.text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            margin="dense"
            id="name"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions className="dialog__Content">
          <Button onClick={handleClose} className='dialog__Content'>
            Cancel
          </Button>
          <Button onClick={onUpdate} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditButton;
