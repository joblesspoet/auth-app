import React, {useEffect, useState} from 'react'
import logo from '../../logo.svg';
import '../../App.css';
import  allActions  from '../../actions/index';
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import API_INSTANCE from '../../config/connection';

function Home() {
    const auth = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [devices, setDevices] = useState([]);    
    
   
    useEffect(() => {
        async function getAllDevices(){            
            await API_INSTANCE.get('/devices',{
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            }).then(resp => resp.data)
                .then(device_obj => {
                    console.log(device_obj)
                    setDevices(device_obj.data)                    
                })       
        }
        API_INSTANCE.defaults.headers.common['Authorization'] = `Bearer ${auth.access_token}`;        
        getAllDevices();         
    },[])
    
    const logoutUser = async () => {
        console.log(auth.access_token);
        
        await API_INSTANCE        
        .post('/logout')
        .then((resp) => {                        
            console.log(resp.data);
            dispatch(allActions.authActions.logOut()); 
            history.replace('/auth/login');
            delete API_INSTANCE.defaults.headers.common['Authorization'];
        }, error => console.log(error))
        .catch(error => {
            console.log('issue in logout');
            console.log(error)
        })        
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button className="App-link" as="Link" onClick={logoutUser}>Logout</button>                
            </header>
            <div className="container">
                {/* show devices listing here */}
            </div>
        </div>
    )
}

export default Home
