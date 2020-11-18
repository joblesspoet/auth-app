import React from 'react'
import logo from '../../logo.svg';
import '../../App.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import  allActions  from '../../actions/index';
import { useHistory } from "react-router-dom";
import {firebase_auth} from '../../helpers/helpers';

function Home() {
    // const auth = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    

    const moveToLogin = () => {
        firebase_auth.signOut().then(resp => {
            // console.log(resp)
            dispatch(allActions.authActions.logOut());
            history.replace('/auth/login');
        }, error => console.log(error));
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button className="App-link" as="Link" onClick={moveToLogin}>Logout</button>                
                <Link className="App-link" to="/auth/register" >Register</Link>
            </header>
        </div>
    )
}

export default Home
