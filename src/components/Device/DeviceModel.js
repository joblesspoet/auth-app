import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function DeviceModel(props) {
  

  const closeModal = () => {
    props.modalHandle(true);
  }

  const handleConfirmBooking = () =>{
    props.modalConfirmBooking(true);
  }

  return (
    <Modal  
      open={props.open}      
      {...props}
    >
      <Modal.Header>Request Device {props.bookingSucces}</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={props.device.device_picture} wrapped />
        <Modal.Description>
          <Header>{props.device.device_name}</Header>
          <p>
          {props.device.device_model}
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      
            <Modal.Actions>
                <Button color='black' onClick={closeModal}>
                Close
                </Button>
                {
                props.device.status === 'aaAVAILABLE' && (
                    <Button
                    content="Book Device"
                    labelPosition='right'
                    icon='checkmark'          
                    positive
                    onClick={handleConfirmBooking}
                />)
                }
            </Modal.Actions>
      
      }
      
    </Modal>
  )
}

export default DeviceModel