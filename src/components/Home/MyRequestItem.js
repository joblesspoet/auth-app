import React, {useState} from 'react'
import {
    Card,
    Badge,
    Alert
  } from "react-bootstrap";
import "./Home.scss";

function MyRequestItem({item}) {
    
    const [state, setstate] = useState('')

    // if(item.request_status === 'PENDING'){
    //     requestStatusClass = 'info';
    //     badge_value = "Request Pending";
    // } else if(item.request_status === 'PLEASE_COLLECT'){
    //     requestStatusClass = 'info';
    //     badge_value = "Please Collect";
    // } else if(item.request_status === 'APPROVED'){
    //     requestStatusClass = 'info';
    //     badge_value = "Request Approved";
    // }

    


    return (
            <Card className="mb-2 card-box">
                <Card.Body>
                    <Card.Subtitle className="mb-2">
                    {item.device.device_name} ({item.device.device_model})
                    &nbsp;<Badge pill variant='info'>
                        {item.request_status}
                    </Badge>
                    </Card.Subtitle>
                    <Card.Text className="mb-0">
                    {item.request_detail}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
    )
}

export default MyRequestItem
