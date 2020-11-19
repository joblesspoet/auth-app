import React, {useState, useEffect} from 'react'
import { Button, Form, Grid, Header, Image, Input, Message, Segment } from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import  allActions  from '../../../actions/index';
import {  useHistory } from "react-router-dom";
// import {firebase_auth} from '../../../helpers/helpers';
// import {commonHelper} from '../../../helpers/common';
import API_INSTANCE from '../../../config/connection';



function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.is_logged_in);
    const objUser = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setErrors] = useState({});    
    const formError = checkIfErrorExits(objUser);

    const handleInputChange = (event) => {    
        if(event.target.name === 'email') {
            setEmail(event.target.value)
        } else if(event.target.name === 'password') {
            setPassword(event.target.value)
        }
    }
    
   useEffect(() => {
    const resetInputFields = () => {
        setEmail('');
        setPassword('');        
    }
    resetInputFields();
   }, [isAuth])
   
   useEffect(() => {
    
    return function cleanup() {
        setErrors({});
        setEmail('');
        setPassword('');         
    };
    // eslint-disable-next-line
  }, []);
  

   const handleLoginAction = async () => {
        console.log('called')
        await doUserLogin(email,password);    
   }

   /**
    * 
    * @param {string} uemail | user email address
    * @param {string} upassword | user password
    */
   const doUserLogin = async (uemail,upassword) => {

        await API_INSTANCE.post('/auth/login',{email: uemail, password: upassword})
        .then(resp => {
            console.log(resp)
            dispatch(allActions.authActions.loginSuccess({user: resp.data.user, access_token: resp.data.access_token}));
            history.replace('/dashboard');        
        })
        .catch(error => {
            // validation error
            if(error?.response.status === 422){
                handleServerRespError(error?.response?.data.errors);
                dispatch(allActions.authActions.loginError(error?.response?.data.message))
            }else {
                dispatch(allActions.authActions.loginError(error?.message))
            }
        })
   }

   /**
    * 
    * @param {array} errors object array
    */
   const handleServerRespError = (errors) => {
        let tempError = {};
        
        if(errors?.email){
            tempError.email = {
                content: errors.email[0],
                pointing: 'below'
            };
        }

        if(errors?.password){
            tempError.password= {
                content: errors.password[0],
                pointing: 'below'
            };
        }        
        setErrors(tempError);
        tempError = [];    
   }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={require("../../../assets/logo.png")} /> Log-in to your account
                </Header>
                <Form size='large'>
                    {formError}
                    <Segment stacked>
                        
                        <Form.Field 
                            id="form-input-control-error-email"
                            control={Input} 
                            fluid icon='user' 
                            name="email" 
                            iconPosition='left' 
                            onChange={handleInputChange} 
                            value={email} 
                            placeholder='E-mail address'
                            error={formErrors.email}
                        />

                        <Form.Field
                            id="form-input-control-error-password"
                            control={Input}
                            fluid
                            value={password}
                            icon='lock'
                            name="password"
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={handleInputChange}
                            error={formErrors.password}
                        />

                        <Button color='teal' onClick={handleLoginAction} fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>                
            </Grid.Column>
        </Grid>
    )
}

function checkIfErrorExits(props){    
    return  ( (props && props?.hasError) && (
            <Message>
                <Message.Header>Ops Error....!</Message.Header>
                <p>
                    {props.lastError}
                </p>
            </Message>
        ))    
}

export default Login
