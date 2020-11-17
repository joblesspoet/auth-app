import React, {useEffect} from 'react'
import Routes from './Routes';
import {Provider} from 'react-redux';
import store from './store/configStore';
import firebase from 'firebase';

function App() {
  
  useEffect(() => {
    const initFirebase = () => {
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var firebaseConfig = {
          apiKey: "AIzaSyCkOFY84OFvTFtklZkeV5B-0ciAmQUjxLE",
          authDomain: "device-log-ad1d4.firebaseapp.com",
          databaseURL: "https://device-log-ad1d4.firebaseio.com",
          projectId: "device-log-ad1d4",
          storageBucket: "device-log-ad1d4.appspot.com",
          messagingSenderId: "1020971243142",
          appId: "1:1020971243142:web:cfd18092c1ec7f37336307",
          measurementId: "G-3MYWH17NMN"
      };

      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
       }
    };

    return initFirebase();
  }, [])
  return (
      <>
      <React.Suspense fallback="<div>Please Wait.....</div>">
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
              <Routes />
            {/* </PersistGate> */}
        </Provider>
      </React.Suspense>
      </>
  );
}

export default App;
