pragma solidity ^0.4.19;

import "./BTNYBurnable.sol";

contract BTNYManager is BTNYSale {
	// Get BTNY total amount 
    function totalSupply() public constant returns (uint256) {
        return _totalSupply;
    }
    
    // Get saled BTNY amount in private Sale
    function privateSaleSupply() public view returns (uint256) {
        return _privateSaleSupply;
    }

    // Get saled BTNY amount in pre Sale1
    function preSale1Supply() public view returns (uint256) {
        return _preSale1Supply;
    }

    // Get saled BTNY amount in pre Sale2
    function preSale2Supply() public view returns (uint256) {
        return _preSale2Supply;
    }

    // Get saled BTNY amount in public Sale
    function publicSaleSupply() public view returns (uint256) {
        return _publicSaleSupply;
    }

    // Get verification code to get free ERC-721 Tokens
    function getVerifyCode() public view returns (bytes16) {
        return verifyCodes[msg.sender];
    }

    // Set BTNY ICO dates
    function setDates(uint256 privateTime, uint256 pre1Time, uint256 pre2Time, uint256 publicTime, uint256 endTime) public onlyOwner {
        privateSaleStartTime = privateTime;
        preSale1StartTime = pre1Time;
        preSale2StartTime = pre2Time;
        publicSaleStartTime = publicTime;
        saleEndTime = endTime;
    }

    // Get BNTY ICO dates
    function getDates() public view returns(uint256, uint256, uint256, uint256, uint256) {
        return (privateSaleStartTime, preSale1StartTime, preSale2StartTime, publicSaleStartTime, saleEndTime);
    }
}
