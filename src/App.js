import React, { Component } from 'react';

import './App.css';
import FormContainer from './components/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <FormContainer />
        </div>
      </div>
    );
  }
}

export default App;
