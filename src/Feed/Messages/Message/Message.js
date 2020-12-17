import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import './Message.css'

const Message = (props) => {
  return (
    <Card className={(props.message.name===props.fullname)? 'message__currentUser':'message'}>
      <CardContent className={(props.message.name===props.fullname)? 'message__backgroudColorCurrent':'message__backgroudColor'}>
        <Typography className='message__textColor' color="secondary" variant="h6" component="h3">
         {props.message.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Message;

// {props.message.name}: