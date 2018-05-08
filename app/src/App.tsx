import * as React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import BasicLayout from './layouts/BasicLayout';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BasicLayout />
        </div>
      </Provider>
    );
  }
}

export default App;
