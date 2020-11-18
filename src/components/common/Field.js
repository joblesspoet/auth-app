import React from 'react';
import {Form, Input } from 'semantic-ui-react'

function Field(props) {
    const updateFieldValue = (e) => {
        props.changeValue(e);
    }
    return (
        <Form.Field>
            <label>{props.name}</label>
            <Input {...props} onChange={(e)=> updateFieldValue(e.target.value)} />                        
        </Form.Field>
    );
}

export default Field;