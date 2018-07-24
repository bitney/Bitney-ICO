pragma solidity ^0.4.19;

import "./_SafeMath.sol";
import "./_Ownable.sol";
import "./_ERC20.sol";

contract BTNYBasic is Ownable, ERC20, Burnable, usingOraclize, CharacterOwnership {

    using SafeMath for uint256;

    // Token properties
    string public name = "Bitney";                //Token name
    string public symbol = "BTNY";                  //Token symbol
    uint256 public decimals = 18;

    uint256 public _totalSupply = 1000000000e18;
    uint256 public _privateSaleSupply = 2000000e18;
    uint256 public _preSale1Supply = 1000000e18;
    uint256 public _preSale2Supply = 1000000e18;
    uint256 public _publicSaleSupply = 1000000e18;

    uint256 public _totalEth = 0;

    // Address of ERC 721 Token
    CharacterOwnership _characterOwnerShip;

    // Balances for each account
    mapping (address => uint256) balances;
    mapping (address => bytes16) verifyCodes;

    // Owner of account approves the transfer of an amount to another account
    mapping (address => mapping(address => uint256)) allowed;
    
    // start and end timestamps where investments are allowed (both inclusive)
    uint256 public privateSaleStartTime = 1529063000; 
    uint256 public preSale1StartTime = 1529063448;
    uint256 public preSale2StartTime = 1530359448;
    uint256 public publicSaleStartTime = 1530445848;
    uint256 public saleEndTime = 1532931654;

    // Wallet Address of Token
    address public multisig;

    uint256 public rate = 512610;

    function BTNYStart() public {
        // Initial Owner Wallet Address
        multisig = msg.sender;

        balances[multisig] = _totalSupply;

        owner = msg.sender;
    }

    function balanceOf(address who) public constant returns (uint256) {
        return balances[who];
    }

    function transfer(address to, uint256 value) public returns (bool success)  {
        uint256 transferValue = value.mul(1e18);
        require (
            balances[msg.sender] >= transferValue && transferValue > 0
        );
        balances[msg.sender] = balances[msg.sender].sub(transferValue);
        balances[to] = balances[to].add(transferValue);
        Transfer(msg.sender, to, transferValue);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success)  {
        require (
            allowed[from][msg.sender] >= value && balances[from] >= value && value > 0
        );
        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(value);
        Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool success)  {
        require (balances[msg.sender] >= value && value > 0);
        allowed[msg.sender][spender] = value;
        Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address _owner, address spender) public constant returns (uint256) {
        return allowed[_owner][spender];
    }
}
