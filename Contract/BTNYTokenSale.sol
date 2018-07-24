pragma solidity ^0.4.19;

import "./BTNYInit.sol";

contract BTNYSale is BTNYInit {
	event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    function tokensale(address recipient, bytes16 code) public payable {
        require(recipient != 0x0);
    
        uint256 weiAmount = msg.value;
        uint256 tokenToSend = weiAmount.mul(getPrice());
        
        require(tokenToSend > 0);
        if ((privateSaleStartTime < now) && (now < preSale1StartTime)) {
            require((_privateSaleSupply >= tokenToSend) && (tokenToSend < 1000.mul(1e18)));
        } else if ((preSale1StartTime < now) && (now < preSale2StartTime)) {
            require(_preSale1Supply >= tokenToSend);
        } else if ((preSale2StartTime < now) && (now < publicSaleStartTime)) {
            require(_preSale2Supply >= tokenToSend);
        } else if (publicSaleStartTime < now) {
            require(_publicSaleSupply >= tokenToSend);
        }
        
        balances[multisig] = balances[multisig].sub(tokenToSend);
        balances[recipient] = balances[recipient].add(tokenToSend);
        if (balances[recipient] >= 500.mul(1e18)) {
            verifyCodes[recipient] = code;
        }
        _totalEth = _totalEth.add(weiAmount);
        

        if ((privateSaleStartTime < now) && (now < preSale1StartTime)) {
            _privateSaleSupply = _privateSaleSupply.sub(tokenToSend);
        } else if ((preSale1StartTime < now) && (now < preSale2StartTime)) {
            _preSale1Supply = _preSale1Supply.sub(tokenToSend);
        } else if ((preSale2StartTime < now) && (now < publicSaleStartTime)) {
            _preSale2Supply = _preSale2Supply.sub(tokenToSend);
        } else if (publicSaleStartTime < now) {
            _publicSaleSupply = _publicSaleSupply.sub(tokenToSend);
        }

        _characterOwnerShip.characterCreationPermissionSet(recipient);
        _characterOwnerShip.characterCreateByBitneyToken(recipient);

        multisig.transfer(msg.value);
        TokenPurchase(msg.sender, recipient, weiAmount, tokenToSend);
    }

    function getPrice() public view returns (uint256 result) {
        uint _price;
        require (now < saleEndTime);
        if ((privateSaleStartTime < now) && (now < preSale1StartTime)) {
            _price = 0;
        } else if ((preSale1StartTime < now) && (now < preSale2StartTime)) {
            _price = rate.div(64);
        } else if ((preSale2StartTime < now) && (now < publicSaleStartTime)) {
            _price = rate.div(72);
        } else if (publicSaleStartTime < now) {
            _price = rate.div(80);
        }
        return _price;
    }
}
