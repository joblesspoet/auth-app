import React from 'react'
import logo from '../../logo.svg';
import '../../App.css';
import {Link} from 'react-router-dom';
function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Link className="App-link" to="/auth/login" >Login</Link>
                <Link className="App-link" to="/auth/reset-password" >Register</Link>
            </header>
        </div>
    )
}

export default Home
