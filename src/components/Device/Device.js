import React, { useState } from "react";

import { Card, Container, Button, Row, Col } from "react-bootstrap";

import "./Device.scss";

function Device(props) {
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
      <Card className="w-100 text-center shadow">
        <div className="device-image-box">
          <Card.Img
            className="device-image"
            variant="top"
            src={props.device_picture}
          />
        </div>
        <Card.Body>
          <Card.Title>
            {props.device_name} ({props.device_model})
          </Card.Title>
          <Card.Text className="text-success">
            <b>{props.status}</b>
          </Card.Text>
          <Button variant="primary" className="w-100" onClick={handleClick}>
            Request Device
          </Button>
        </Card.Body>
      </Card>
    </div>

    // <Segment>
    //     <div class="ui four cards" onClick={handleClick}>
    //         <div class="card">
    //             <div class="image">
    //                 <Image centered src={props.device_picture} />
    //             </div>
    //             <div class="extra">
    //                 <p class="product-name">{props.device_name}</p>
    //                 <p>{props.device_model}</p>
    //                 <p class="product-price"><i class="tag icon"></i><strong>{props.status}</strong></p>
    //             </div>
    //         </div>
    //     </div>
    //     <DeviceModel id="modal-open" open={modal} device={props}
    //     bookingSucces={bookingText}
    //     modalHandle={closeModal} modalConfirmBooking={handleConfirmBooking} />
    // </Segment>
  );
}

export default Device;
