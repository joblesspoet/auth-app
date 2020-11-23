import React from "react";

function Field(props) {
  const updateFieldValue = (e) => {
    props.changeValue(e);
  };
  return (
    <h1>Field</h1>
    // <Form.Field label={props.name}
    //     control={Input}
    //     {...props}
    //     onChange={(e)=> updateFieldValue(e.target.value)}
    // >
    // </Form.Field>
  );
}

export default Field;
