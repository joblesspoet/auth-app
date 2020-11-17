import React, {useState, useEffect} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {useSelector, useDispatch} from 'react-redux'
import  allActions  from '../../../actions/index';
import { Link, useHistory } from "react-router-dom";
import {firebase_auth} from '../../../helpers/helpers';
import {commonHelper} from '../../../helpers/common';

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.is_logged_in);
    const objUser = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // commonHelper.redirectIfLoggedIn(isAuth);

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
   
  

   const handleLoginAction = async () => {
        console.log('called')
        
       firebase_auth.signInWithEmailAndPassword(email,password)
       .then(resp => {
        console.log(resp.user);
        
        dispatch(allActions.authActions.setUser({name: resp.user.name, id: resp.user.uid, email: resp.user.email, providerData: resp.user.providerData}));            
        history.push('/dashboard');
       }, error => dispatch(allActions.authActions.loginError(error.message)));       
   }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={require("../../../assets/logo.png")} /> Log-in to your account
                </Header>
                <Form size='large'>
                    {
                        (objUser && objUser?.hasError) && (
                            <Message>
                                <Message.Header>Ops Error....!</Message.Header>
                                <p>
                                    {objUser.lastError}
                                </p>
                            </Message>
                        )
                    }
                    
                    <Segment stacked>
                        <Form.Input fluid icon='user' name="email" iconPosition='left' onChange={handleInputChange} 
                        value={email} placeholder='E-mail address' />
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
                    New to us? <Link to="/auth/register" as="link">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
