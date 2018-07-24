pragma solidity ^0.4.19;

import "./BTNYOraclize.sol";

contract CharacterOwnership {
    function characterCreationPermissionSet(address);
    function characterCreateByBitneyToken(address);
}

contract BTNYInit is BTNYOraclize {
	function BTNYInit() public {
		sendCompanySupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
		sendStrategySupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
		sendMarketingSupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
		sendCSRSupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
		sendBountySupplyToken(0xa9103591BBf28b6Cc7d17229Ee475c2B45b3299A);
	}

    function sendCompanySupplyToken(address to) public onlyOwner {
        require (to != 0x0);

        balances[multisig] = balances[multisig].sub(2000000e18);
        balances[to] = balances[to].add(2000000e18);
        Transfer(multisig, to, 2000000e18);
    }

    function sendStrategySupplyToken(address to) public onlyOwner {
        require (to != 0x0);

        balances[multisig] = balances[multisig].sub(1500000e18);
        balances[to] = balances[to].add(1500000e18);
        Transfer(multisig, to, 1500000e18);
    }
    
    function sendMarketingSupplyToken(address to) public onlyOwner {
        require (to != 0x0);

        balances[multisig] = balances[multisig].sub(1000000e18);
        balances[to] = balances[to].add(1000000e18);
        Transfer(multisig, to, 1000000e18);
    }
    
    function sendCSRSupplyToken(address to) public onlyOwner {
        require (to != 0x0);

        balances[multisig] = balances[multisig].sub(400000e18);
        balances[to] = balances[to].add(400000e18);
        Transfer(multisig, to, 400000e18);
    }

    function sendBountySupplyToken(address to) public onlyOwner {
        require (to != 0x0);

        balances[multisig] = balances[multisig].sub(100000e18);
        balances[to] = balances[to].add(100000e18);
        Transfer(multisig, to, 100000e18);    
    }

    // Set smart contract address of ERC-721 token that -
    // msg.sender will get 2 free tokens if purchased BTNYs over 500.
    function setERC721Address(address contractAddress) public onlyOwner {
        _characterOwnerShip = CharacterOwnership(contractAddress);
    }
}
