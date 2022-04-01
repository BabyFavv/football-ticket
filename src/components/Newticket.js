import React from 'react'

import { useState } from "react";

const Newticket = (props) => {


 const [url, setUrl] = useState('');
 const [date, setDate] = useState('');
 const [time, setTime] = useState('');
 const [price, setPrice] = useState('');
 
 const submitHandler = (e) => {
  e.preventDefault();

  if(!url || !date || !time || !price ) {
    alert('Please ensure all fields are filled')
    return
  }
  props.addTicket(url, date, time, price);

  setUrl('')
  setDate('')
  setTime('')
  setPrice('')

   
};

return (
  <> 
  <div className='mb-3'> 
  <form onSubmit={submitHandler}>
  <div class="form-group">
    <label for="Input image url">Ticket url</label>
    <input type="text"
               className="form-control"
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="Ticket url" />
  </div>
   
  <div class="form-group">
    <label for="Input match date">Match date</label>
    <input type="text"
               className="form-control"
               value={date}
               onChange={(e) => setDate(e.target.value)}
               placeholder="Match date"/>
  </div>
  <div class="form-group">
    <label for="Input match time">Match time</label>
    <input type="text"
               className="form-control"
               value={time}
               onChange={(e) => setTime(e.target.value)}
               placeholder="Match time"/>
  </div>
  <div class="form-group">
    <label for="Input ticket price">Ticket price</label>
    <input type="text"
               className="form-control"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               placeholder="Ticket price"/>
  </div>
  <button type="submit" class="btn btn-outline-success bot">Add ticket</button>
</form> 
</div>
</>
               
        )
    }
    export default Newticket;

  
 
