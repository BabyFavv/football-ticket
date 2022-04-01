import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";



import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import MatchTicket from  "./contract/MatchTicket.abi.json";
import IERC from "./contract/IERC.abi.json";
import Tickets from './components/Tickets';
import Newticket from './components/Newticket';
 




const ERC20_DECIMALS = 18;


const contractAddress = "0xCfbbd6daBE9DF402A09ACD4dda5c434586037a86";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";




function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [tickets, setTickets] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Error Occurred");
    }
  };

  const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(MatchTicket, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });



  const getTicket = (async () => {
    const ticketsLength = await contract.methods.getticketsLength().call();
    const _tickett = []
    for (let index = 0; index < ticketsLength; index++) {
      console.log(ticketsLength);
      let _tickets = new Promise(async (resolve, reject) => {
      let ticket = await contract.methods.getTicket(index).call();

        resolve({
          index: index,
          owner: ticket[0],
          url: ticket[1],
          date: ticket[2],
          time: ticket[3],
         price: ticket[4],
           sold: ticket[5]
         
             
        });
      });
      _tickett.push(_tickets);
    }

    const _tickets = await Promise.all(_tickett);
    setTickets(_tickets);
    console.log(_tickets)
  });

  const addTicket = async (
    _url,
    _date,
    _time,
    price
  ) => {

    const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .addTicket(_url, _date, _time, _price)
        .send({ from: address });
       getTicket();
    } catch (error) {
      console.log(error);
    }
  };

  const changeMatchdate = async (_index, _newDate) => {
    console.log(_index);
    try {
      await contract.methods.changeMatchdate (_index, _newDate).send({ from: address });
      getTicket();
      getBalance();
    } catch (error) {
     console.log(error);
     alert("your match date has been changed")
    }};

    const buyTicket = async (_index, _price) => {
      try {
        const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
      
        
        await cUSDContract.methods
          .approve(contractAddress, tickets[_index].price)
          .send({ from: address });
        await contract.methods.buyTicket(_index).send({ from: address });
        getTicket();
        getBalance();
      } catch (error) {
        console.log(error)
      }};


      useEffect(() => {
        connectToWallet();
      }, []);
    
      useEffect(() => {
        if (kit && address) {
          getBalance();
         
        }
      }, [kit, address]);
    
      useEffect(() => {
        if (contract) {
          getTicket();
        }
      }, [contract]);  

      return (
        <div>
          <Navbar balance = {cUSDBalance} />
          <Tickets tickets ={tickets}
          buyTicket = {buyTicket}
          changeMatchdate= {changeMatchdate}
           
          />
           <Newticket addTicket = {addTicket}
           
/>
        </div>
        )


}
export default App;