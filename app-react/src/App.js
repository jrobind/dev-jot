import React, { Component } from 'react';
import logo from './logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" style={{height: '100px'}} />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
