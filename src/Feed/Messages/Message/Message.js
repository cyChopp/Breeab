import { Avatar, Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import './Message.css'

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Message = (props) => {

  const styles = useClasses();

  return (
    <>
      {props.message.name === props.fullname ? (
        <div className="message__wrapperCurrentUser">
          <Card className="message__currentUser">
            <CardContent className="message__backgroudColorCurrent">
              <Typography
                className="message__textColor"
                color="secondary"
                variant="h6"
                component="h3"
              >
                {props.message.message}
              </Typography>
            </CardContent>
          </Card>
          <Avatar src={props.image} className={styles.large}/>
        </div>
      ) : (
        <div className="message__wrapper">
          <Avatar src={props.image} className={styles.large} />
          <Card className="message">
            <CardContent className="message__backgroudColor">
              <Typography
                className="message__textColor"
                color="secondary"
                variant="h6"
                component="h3"
              >
                {props.message.message}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default Message;

// {props.message.name}: