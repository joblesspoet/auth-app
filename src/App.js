import React, {useEffect} from 'react'
import Routes from './Routes';
import {Provider} from 'react-redux';
import configureStore from './store/configStore';
import { PersistGate } from 'redux-persist/integration/react'
import { API_INTERCEPTOR } from './config/connection';
const {store,persistor} = configureStore();

function App() {
  
  useEffect(() => {
    const fire_base = async () => {
    await API_INTERCEPTOR(store);
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
