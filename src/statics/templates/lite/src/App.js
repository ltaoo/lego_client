import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    foo: 'bar',
  };
  handleClick = () => {
    this.setState({
      foo: 'bar1',
    });
    this.setState({
      foo: 'bar2',
    });
  }
  render() {
    console.log(this.state.foo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleClick}>click it</button>
      </div>
    );
  }
}

export default App;
