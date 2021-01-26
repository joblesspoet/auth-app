import React, { useState } from "react";

import { Card, Container, Button, Row, Col } from "react-bootstrap";

import "./Device.scss";

function Device(props) {
  console.log(props)
  const [bookingText, setBookingText] = useState("");

  const handleClick = () => {
    props.deviceClick(props);
  };

  const closeModal = () => {
    // setModal(false);
    setBookingText("");
  };

  const handleConfirmBooking = (user_answer) => {
    setBookingText("You booking request has been sent successfully.");
  };
  return (
    <div>
      <Card className="w-100 text-center deviceCard">
        <div className="device-image-box">
          <Card.Img
            className="device-image"
            variant="top"
            src={props.device_picture}
            // src="https://purepng.com/public/uploads/large/smartphone-iphone-11-pro-max-silver-san.png"
          />
        </div>
        <Card.Body>
          <Card.Title>
            {props.device_name} ({props.device_model})
          </Card.Title>
          <Card.Text
            className={
              props.status == "INUSE" ? "text-warning" : "text-success"
            }
          >
            <b>{props.status}</b>
          </Card.Text>
          <Button
            variant="secondary"
            disabled={props.status !== "AVAILABLE"}
            className="w-100"
            onClick={handleClick}
          >
            Request Device
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Device;
