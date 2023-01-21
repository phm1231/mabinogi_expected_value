import React from "react";
import Select, { components } from "react-select";
import "./component.css"


// props must have <value, label>
function SelectList(props) {

    const changeValue = (index, e) =>{
        props.setValue(e.value, index);
    }

    if(props.disabled === "false"){
        return(
            <div className="optionInputItem">
                <Select
                    options={props.options}
                    onChange={(e) => { changeValue(props.index, e) }}
                    placeholder={props.placeholder}
                />
            </div>
        )
    }
    else{
        return(
            <div className="optionInputItem">
                <Select
                    placeholder={props.placeholder}
                />
            </div>
        )
    }

}

export default SelectList