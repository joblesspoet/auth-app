import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Checkbox } from 'semantic-ui-react'
import Field from '../../common/Field';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [terms_condition, setTerms] = useState(false);
    const [formErrors, setErrors] = useState([]);
    

    const validateForm = () => {
        let fieldsError = {};
        if(name === ""){
            fieldsError.name = {
                    content: 'Name Field is Required',
                    pointing: 'below'
                }
            
        }
        console.log(fieldsError)
        if(fieldsError.length > 0) {
            setErrors(fieldsError);
            return false            
        }
        else return true;
    }
    
    const handleSignupAction = async () => {
        console.log('hi')
        validateForm();
    }

    console.log(formErrors)
    return (
        <Grid centered style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 550 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={require("../../../assets/logo.png")} /> Create a New Account
                </Header>
                <Form size='large'>
                    <Field name="Name" placeholder="Enter your name" changeValue={(e)=> setName(e)} value={name} error={formErrors.name} />
                    <Field name="Email" placeholder="Enter your email address" changeValue={(e)=> setEmail(e)} value={email} />
                    <Field name="Password" type="password" placeholder="Enter your password" changeValue={(e)=> setPassword(e)} value={password} />
                    <Field name="Confirm Password" type="password" placeholder="Confirm password" changeValue={(e)=> setConfirmPassword(e)} value={confirm_password} />
                    <Form.Field>
                        <Checkbox value={terms_condition} onChange={() => setTerms(!terms_condition)} label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    
                    <Button color='teal' onClick={handleSignupAction} >
                    Submit
                </Button>
                    <Link to="/">Login</Link>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Signup
