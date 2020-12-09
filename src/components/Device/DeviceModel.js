import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DeviceModel(props) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleValidation = () => {
    if (message.length > 0) {
      props.sendRequest(message);
      setError("");
    } else {
      setError("Please enter some detail");
    }
  };

  const handleTextareaChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Modal show={props.setShow}>
      <Modal.Header>
        <Modal.Title>
          {props.device_name} ({props.device_model})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          Do you want to request &nbsp;
          <b>
            {props.device_name} ({props.device_model})?
          </b>
          &nbsp; Please fill in some detail and press submit.
        </Form.Label>
        <br />
        <br />
        <Form.Group controlId="requestDetail">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Details..."
            defaultValue={message}
            required
            name="message"
            onChange={handleTextareaChange}
            className={error ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.modalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleValidation}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    // <Modal open={props.open} {...props}>
    //   <Modal.Header>Request Device {props.bookingSucces}</Modal.Header>
    //   <Modal.Content image>
    //     <Image size="medium" src={props.device.device_picture} wrapped />
    //     <Modal.Description>
    //       <Header>{props.device.device_name}</Header>
    //       <p>{props.device.device_model}</p>
    //       <p>Is it okay to use this photo?</p>
    //     </Modal.Description>
    //   </Modal.Content>
    //   <Modal.Actions>
    //     <Button color="black" onClick={closeModal}>
    //       Close
    //     </Button>
    //     {props.device.status === "AVAILABLE" && (
    //       <Button
    //         content="Book Device"
    //         labelPosition="right"
    //         icon="checkmark"
    //         positive
    //         onClick={handleConfirmBooking}
    //       />
    //     )}
    //   </Modal.Actions>
    //   }
    // </Modal>
  );
}

export default DeviceModel;
