import React from 'react'
import logo from '../../logo.svg';
import '../../App.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import  allActions  from '../../actions/index';
import { useHistory } from "react-router-dom";

function Home() {
    // const auth = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    

    const moveToLogin = () => {
        dispatch(allActions.authActions.setUser({name: 'Ghulam Rasool', 'id': 1, email: 'sanglavi@hotmail.com'}));
        history.push('/auth/login');
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button className="App-link" as="Link" onClick={moveToLogin}>Login</button>                
                <Link className="App-link" to="/auth/reset-password" >Register</Link>
            </header>
        </div>
    )
}

export default Home
