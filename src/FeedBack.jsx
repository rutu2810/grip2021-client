import React from "react";
import { Alert } from "reactstrap";

function FeedBack({ type, message, on }) {
  return on ? <Alert color={type}>{message}</Alert> : null;
}

export default FeedBack;
