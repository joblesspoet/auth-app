import React, {useEffect, useState} from 'react'
import logo from '../../logo.svg';
import '../../App.css';
import {Link} from 'react-router-dom';
import  allActions  from '../../actions/index';
import { useHistory } from "react-router-dom";
import {firebase_auth,firestore} from '../../helpers/helpers';
import {useSelector, useDispatch} from 'react-redux'

function Home() {
    // const auth = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const getAllDevices = () => {
            let tempDevices = [];
            firestore.collection('devices').get().then(data => {
                data.forEach((doc) => {
                    // console.log(`${doc.id} and name of device is ${JSON.stringify(doc.data())}`);
                    tempDevices.push({id: doc.id, data: doc.data()});
                })
                setDevices(tempDevices)
            })
        }
       return getAllDevices(); 
    },[])

    console.log(devices);
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
            <div className="container">

            </div>
        </div>
    )
}

export default Home
