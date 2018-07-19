import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const MyContract = window.web3.eth.contract([
      {
        constant: false,
        inputs: [],
        name: "kill",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getSecret",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "you_awesome",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "ReactExample",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        payable: true,
        stateMutability: "payable",
        type: "fallback"
      }
    ]);
    this.state = {
      ContractInstance: MyContract.at(
        "0xad10de4d7fabf535bf53ce0ec7bd8e04fe3e60d1"
      )
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
