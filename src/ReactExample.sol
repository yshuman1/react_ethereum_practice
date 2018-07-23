pragma solidity ^0.4.11;

contract Reactexample{
    address private owner;
    
    string private secret;
    string public you_awesome;
    string private state;
    bool public pseudoRandomResult;
    event experimentComplete (bool result);

    constructor () public {
    owner = msg.sender;
    you_awesome = "You're awesome!";
    secret = "secret data";
    state = "Initial state";
    }
    
    function getState () public constant returns (string) {
    return state;
    }

    function setState (string newState) public payable {
    state = newState;
    }
    
   
    function getSecret () public constant returns (string) {
    return secret;
    }
    
    function kill () public {
    require (msg.sender == owner);
    selfdestruct (owner);
    }

    function setExperimentInMotion () public payable returns (bool) {
    bytes32 _pseudoRandomResult = keccak256(abi.encodePacked(msg.sender,msg.value,msg.data));
    if (_pseudoRandomResult > bytes32 (10)) return pseudoRandomResult = true;
    else return pseudoRandomResult = false;

    emit experimentComplete (pseudoRandomResult);
  }
    
    
   function () public payable {
    revert ();
   }
    
}