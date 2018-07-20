pragma solidity ^0.4.19;

import "./usingOraclize.sol";

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Ownable {
  address public owner;


  /** 
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public{
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner. 
   */
  modifier onlyOwner() {
    require(owner==msg.sender);
    _;
 }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to. 
   */
  function transferOwnership(address newOwner) public onlyOwner {
      owner = newOwner;
  }
 
}
  
contract ERC20 {

    function totalSupply() public constant returns (uint256);
    function balanceOf(address who) public constant returns (uint256);
    function transfer(address to, uint256 value) public returns (bool success);
    function transferFrom(address from, address to, uint256 value) public returns (bool success);
    function approve(address spender, uint256 value) public returns (bool success);
    function allowance(address owner, address spender) public constant returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

}

contract CharacterOwnership {
    function characterCreationPermissionSet(address);
    function characterCreateByBitneyToken(address);
}

contract BTNYToken is Ownable, ERC20, usingOraclize {

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

    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewOraclizeQuery(string description);

    function BTNYToken() public payable {
        // Initial Owner Wallet Address
        multisig = msg.sender;

        balances[multisig] = _totalSupply;

        owner = msg.sender;

        sendCompanySupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
        sendStrategySupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
        sendMarketingSupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
        sendCSRSupplyToken(0x767f749A87bC111aafE5D6344D09A28b20751300);
        sendBountySupplyToken(0xa9103591BBf28b6Cc7d17229Ee475c2B45b3299A);

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

    function () external payable {
        tokensale(msg.sender);
    }

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

    function totalSupply() public constant returns (uint256) {
        return _totalSupply;
    }
    
    function privateSaleSupply() public view returns (uint256) {
        return _privateSaleSupply;
    }

    function preSale1Supply() public view returns (uint256) {
        return _preSale1Supply;
    }

    function preSale2Supply() public view returns (uint256) {
        return _preSale2Supply;
    }

    function publicSaleSupply() public view returns (uint256) {
        return _publicSaleSupply;
    }

    function getVerifyCode() public view returns (bytes16) {
        return verifyCodes[msg.sender];
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

    function setDates(uint256 privateTime, uint256 pre1Time, uint256 pre2Time, uint256 publicTime, uint256 endTime) public onlyOwner {
        privateSaleStartTime = privateTime;
        preSale1StartTime = pre1Time;
        preSale2StartTime = pre2Time;
        publicSaleStartTime = publicTime;
        saleEndTime = endTime;
    }

    function getDates() public view returns(uint256, uint256, uint256, uint256, uint256) {
        return (privateSaleStartTime, preSale1StartTime, preSale2StartTime, publicSaleStartTime, saleEndTime);
    }

    function setERC721Address(address contractAddress) public onlyOwner {
        _characterOwnerShip = CharacterOwnership(contractAddress);
    }
}
