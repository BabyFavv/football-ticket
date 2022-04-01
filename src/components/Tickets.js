import React from 'react';
import { useState } from "react";

const Tickets = (props) => {
  const [newDate, setnewDate] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();}
  
  return (
    
  <div className="row">
     {props.tickets.map((ticket) => (
       <div className="col-3">
        <div class="card" key={ticket.index}>
  <img class="card-img-top toppp" src={ticket.url} alt=" img top"/>
  
  <div class="card-section">  
    <h3 class="dateyy">Match Date: {ticket.date}</h3>
    <h3 class="timee">Match Time: {ticket.time}</h3>
    <h3 class="pricee">Ticket Price: {ticket.price / 1000000000000000000}cUSD</h3>
    </div>
  <div class="card-bottom">
  <button type="button" class="btn btn-outline-secondary" onClick={() => props.buyTicket(ticket.index)}>Buy ticket</button>
  </div>

  

                  <div class="form-row">
                  
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setnewDate(e.target.value)}
                      placeholder="new date"
                    />
                    <button
                      type="submit"
                      onClick={() => props. changeMatchdate(ticket.index, newDate)}
                      className="btn btn-success"
                    >
                      Change Date
                    </button>
                  </div>
                
</div>


 
       </div>
       
       
       



     ))};


  </div>
   


  )

     }
    
  export default Tickets;