import React, { useState } from 'react';

import { Image, Segment } from 'semantic-ui-react'
import DeviceModel from './DeviceModel';
function Device(props) {
    const [modal, setModal] = useState(false);
    const [bookingText, setBookingText] = useState('');

    const handleClick = () => {
        // props.deviceClick(props);
        setModal(true);
    }

    const closeModal = () => {
        setModal(false)
        setBookingText('');
    };
    
    const handleConfirmBooking = (user_answer) => {        
        setBookingText('You booking request has been sent successfully.');
    }
    return (
        <Segment>            
            <div class="ui four cards" onClick={handleClick}>
                <div class="card">
                    <div class="image">
                        <Image centered src={props.device_picture} />
                    </div>
                    <div class="extra">
                        <p class="product-name">{props.device_name}</p>
                        <p>{props.device_model}</p>
                        <p class="product-price"><i class="tag icon"></i><strong>{props.status}</strong></p>
                    </div>
                </div>
            </div>
            <DeviceModel id="modal-open" open={modal} device={props}
            bookingSucces={bookingText}
            modalHandle={closeModal} modalConfirmBooking={handleConfirmBooking} />
        </Segment>
    );
}

export default Device;