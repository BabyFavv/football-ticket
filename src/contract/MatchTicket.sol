 // SPDX-License-Identifier: MIT
 // Note: 👆 The above line is mandatory to avoid compiler warnings like 
(Warning: SPDX license identifier not provided in source file.) 


/* pragma keyword is used to enable certain compiler features or checks. */
pragma solidity >=0.7.0 <0.9.0; // This is a version pragma


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
    //Variable used as the index to store all tickets
    
    uint internal ticketsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Ticket {
        address payable owner;
        string image;
        string date;
        string time;
         uint price;
        uint sold;
         
      
         
    }

      mapping (uint =>  Ticket) internal tickets;

//  function use to add ticket
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
   
    // returns tickets by index
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
// this function is used to delete tickets
       function Delete (uint _index)public{
        require(tickets[_index].owner==msg.sender, "Error");
        delete(tickets[_index]);
    }

// this function is used to change match date
      function changeMatchdate(uint _index, string memory _date) public {
        require(msg.sender == tickets[_index].owner, "Only creator can change the date");
        tickets[_index].date = _date;



     }
// this function is used to buy ticket
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
    //  this function returns the total number of tickets
    function getticketsLength() public view returns (uint) {
        return (ticketsLength);
    }
}
