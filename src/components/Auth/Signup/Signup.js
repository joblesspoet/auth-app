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
        let errorCount = 0;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(name === ""){
            fieldsError.name = {
                content: 'Name Field is Required',
                pointing: 'below'
            }

            errorCount++;
        }

        if(email === ""){
            fieldsError.email = {
                content: 'Email field is Required',
                pointing: 'below'
            }
            errorCount++;
        }else if (!regex.test(email)) {
            fieldsError.email = {
                content: 'Invalid email address',
                pointing: 'below'
            }

            errorCount++;
        }

        if(password === ""){
            fieldsError.password = {
                content: 'Password field is Required',
                pointing: 'below'
            }
            errorCount++;
        }else if (password.length < 6) {
            fieldsError.password = {
                content: 'Minimum password 6 digit required.',
                pointing: 'below'
            }
            errorCount++;
        }

        if(confirm_password === ""){
            fieldsError.confirm_password = {
                content: 'Confirm Password field is Required',
                pointing: 'below'
            }
            errorCount++;
        }else if (confirm_password.length < 6) {
            fieldsError.confirm_password = {
                content: 'Minimum confirm password 6 digit required.',
                pointing: 'below'
            }
            errorCount++;
        }

        if(password !== confirm_password) {
            fieldsError.confirm_password = {
                content: 'Password and confirm password should match.',
                pointing: 'below'
            }
            errorCount++;
        }

        if(errorCount > 0) {
            console.log(fieldsError)
            setErrors(fieldsError);
            return false            
        }
        else {
            setErrors({});
            return true
        };
    }
    
    const handleSignupAction = async () => {
        validateForm();
    }
    return (
        <Grid centered style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 550 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={require("../../../assets/logo.png")} /> Create a New Account
                </Header>
                <Form size='large'>
                    <Field id='form-input-control-error-name' name="Name" placeholder="Enter your name" changeValue={(e)=> setName(e)} value={name} 
                    error={formErrors.name} />
                    <Field id='form-input-control-error-email' name="Email" placeholder="Enter your email address" changeValue={(e)=> setEmail(e)} error={formErrors.email} value={email} />
                    <Field id='form-input-control-error-password' name="Password" type="password" placeholder="Enter your password" changeValue={(e)=> setPassword(e)}  error={formErrors.password} value={password} />
                    <Field id='form-input-control-error-confirm_password' name="Confirm Password" type="password" placeholder="Confirm password" changeValue={(e)=> setConfirmPassword(e)}  error={formErrors.confirm_password} value={confirm_password} />
                    <Form.Field>
                        <Checkbox onChange={() => setTerms(!terms_condition)} label='I agree to the Terms and Conditions' />
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
