import React, {useState} from "react";
import ToolImg from '../img/toolimg.png';
import './component.css';

function InputPrice(props){

  const [myV, setmyV] = useState(0);

  const handleChange = (e)=>{
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setmyV(e.target.value);
  }

  return (
    <div className="priceInputItem">
      <span>
        <img className="toolImg" src={ToolImg}></img>
        정교한 세공 도구
      </span>
      <br></br>
      <input type="text" onChange={(e) =>
        handleChange(e)
      }/>
    </div>
  )
}


export default InputPrice