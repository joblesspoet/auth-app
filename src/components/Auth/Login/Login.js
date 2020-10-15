import React, {useState, useEffect} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import  allActions  from '../../../actions/index';
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.is_logged_in);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        console.log(isAuth)        
    }
    return resetInputFields();
   }, [isAuth])

   const handleLoginAction = () => {       
        dispatch(allActions.authActions.setUser({name: 'Ghulam Rasool', 'id': 1, email: email}));            
        history.push('/dashboard');
   }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Image src={require("../../../assets/logo.png")} /> Log-in to your account
            </Header>
            <Form size='large'>
                <Segment stacked>
                <Form.Input fluid icon='user' name="email" iconPosition='left' onChange={handleInputChange} value={email} placeholder='E-mail address' />
                <Form.Input
                    fluid
                    value={password}
                    icon='lock'
                    name="password"
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={handleInputChange}
                />

                <Button color='teal' onClick={handleLoginAction} fluid size='large'>
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='#'>Sign Up</a>
            </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
