import React, { Component } from "react";
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
        constant: false,
        inputs: [],
        name: "ReactExample",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          {
            name: "newState",
            type: "string"
          }
        ],
        name: "setState",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
      },
      {
        payable: true,
        stateMutability: "payable",
        type: "fallback"
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
        name: "getState",
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
      }
    ]);
    this.state = {
      ContractInstance: MyContract.at(
        "0x9fbda871d559710256a2502a2517b794b482db40"
      ),
      contractState: " "
    };
    this.querySecret = this.querySecret.bind(this);
    this.queryContractState = this.queryContractState.bind(this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind(this);
    this.queryConditionResult = this.queryConditionResult.bind(this);
    this.activateExperiment.bind(this);
  }

  queryConditionResult() {
    const { psuedoRandomResult } = this.state.ContractInstance;

    psuedoRandomResult((err, result) => {
      console.log("this is the smart contract conditional::::", result);
    });
  }

  activateExperiment() {
    const { setExperimentInMotion } = this.state.ContractInstance;

    setExperimentInMotion(
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, "ether")
      },
      (err, result) => {
        console.log("Experiment to determine true or false set in motion.");
      }
    );
  }

  querySecret() {
    const { getSecret } = this.state.ContractInstance;

    getSecret((err, secret) => {
      if (err) console.error("An error occured::::", err);
      console.log("This is our contract's secret::::", secret);
    });
  }

  queryContractState() {
    const { getState } = this.state.ContractInstance;

    getState((err, state) => {
      if (err) console.error("An error occured::::", err);
      console.log("This is our contract's state::::", state);
    });
  }

  handleContractStateSubmit(event) {
    event.preventDefault();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState(
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, "ether")
      },
      (err, result) => {
        console.log("Smart contract state is changing.");
      }
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React & Ethereum Simple Application</h1>
        </header>
        <br />
        <br />
        <button onClick={this.querySecret}>
          Query Smart Contract's Secret
        </button>
        <br />
        <br />
        <button onClick={this.queryContractState}>Query Contract State</button>
        <br />
        <br />
        <form onSubmit={this.handleContractStateSubmit}>
          <input
            type="text"
            name="state-change"
            placeholder="Enter new state..."
            value={this.state.contractState}
            onChange={event =>
              this.setState({ contractState: event.target.value })
            }
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

export default App;
