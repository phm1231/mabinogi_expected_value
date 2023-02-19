import React, {useState} from "react";
import './component.css';

function InputPrice(props){

  const handleChange = (e)=>{
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    props.onChange(e.target.value);
  }

  return (
    <div className="priceInputItem">
      <input type="text" 
        maxLength='8'
        placeholder={props.placeholder}
        onChange={(e) =>
        handleChange(e)
      }/>
    </div>
  )
}


export default InputPrice