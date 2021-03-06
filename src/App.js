import React, {useEffect} from 'react'
import Routes from './Routes';
import {Provider} from 'react-redux';
import configureStore from './store/configStore';
// import {firebase_auth} from './helpers/helpers';
import { PersistGate } from 'redux-persist/integration/react'
const {store,persistor} = configureStore();

function App() {
  
  useEffect(() => {
    const fire_base = async () => {
      // await fb_helper.initializeFireBase();      
    };

    fire_base();
  }, [])
  return (
      <React.Fragment>
      <React.Suspense fallback="<div>Please Wait.....</div>">
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes />
            </PersistGate>
        </Provider>
      </React.Suspense>
      </React.Fragment>
  );
}

export default App;
