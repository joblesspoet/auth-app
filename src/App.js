import React from 'react';
import Routes from './Routes';
import {Provider} from 'react-redux';
import store from './store/configStore';

function App() {
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
