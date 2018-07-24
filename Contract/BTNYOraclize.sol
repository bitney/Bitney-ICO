pragma solidity ^0.4.19;

import "./_usingOraclize.sol";
import "./BTNYBasic.sol";

contract BTNYOraclize is BTNYStart {
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewOraclizeQuery(string description);

    function BTNYOraclize() public payable {
        LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Oraclize Query.");
        updatePrice();
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) revert();
        rate = parseInt(result, 3);
        LogPriceUpdated(result);
        updatePrice();
    }

    function updatePrice() payable {
        if (oraclize_getPrice("URL") > this.balance) {
            LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            oraclize_query(14400, "URL", "json(https://api.infura.io/v1/ticker/ethusd).bid");
        }
    }
}
