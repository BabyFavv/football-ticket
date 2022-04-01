  // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}
 
 
contract  MatchTicket {
    
    
    uint internal ticketsLength = 0;
    address internal cUsdTokenAddress = 0x686c626E48bfC5DC98a30a9992897766fed4Abd3;

    struct  Ticket {
        address payable owner;
        string image;
        string date;
        string time;
         uint price;
        uint sold;
         
      
         
    }

      mapping (uint =>  Ticket) internal tickets;

 
    function  addTicket(
        string memory _image, 
        string memory _date,
         string memory _time,
        uint _price
        
        
    ) public {
         uint _sold = 0;

         tickets [ticketsLength] =  Ticket(
            payable(msg.sender),
            
            _image,
            _date,
            _time,
            _price,
            _sold
            
             
        );

        ticketsLength++;
    }
   
    
    function getTicket(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        uint,
        uint
      
    ) {
        return (  
            tickets[_index].owner,
             tickets[_index].image, 
             tickets[_index].date,
            tickets[_index].time,
           tickets[_index].price,
           tickets[_index].sold
            
            
             
        );
    }




      function changeMatchdate(uint _index, string memory _date) public {
        require(msg.sender == tickets[_index].owner, "Only creator can change the date");
        tickets[_index].date = _date;



     }

    function buyTicket(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            tickets[_index].owner,
            tickets[_index].price
          ),
          "Transfer failed."
        );

        tickets[_index].owner = payable(msg.sender);
         
    }
     
    function getticketsLength() public view returns (uint) {
        return (ticketsLength);
    }
}
