import React from "react";
import Select, { components } from "react-select";
import "./component.css"


// props must have <value, label>
function SelectList(props) {

    const changeValue = (index, e) =>{
        props.setValue(e.value, index);
    }

    if(props.content === "rank" || props.content === "type" || props.content === "race"){
        return(
                <Select
                    options={props.options}
                    onChange={(e) => { changeValue(props.index, e) }}
                    placeholder={props.placeholder}
                />
        )
    }
    
    else if(props.content === "option"){
        if(props.value === null || props.value === undefined){
            return(
                    <Select
                        className="inlineSelect optionSelectItem"
                        placeholder={props.placeholder}
                        options={props.options}
                        onChange={(e) => { changeValue(props.index, e) }}
                    />
            )     
        }
        else{
            return(
                <Select
                    className="inlineSelect optionSelectItem"
                    value={{value: props.value, label: props.value}}
                    options={props.options}
                    onChange={(e) => { changeValue(props.index, e) }}
                />
            )  
        }   
    }
    else if(props.content === "level"){
        return(
            <Select
                className="inlineSelect optionSelectItem"
                options={props.options}
                onChange={(e) => { changeValue(props.index, e) }}
                placeholder={props.placeholder}
            />
        )        
    }
    else{
        return(
                <Select
                    placeholder={props.placeholder}
                />
        )
    }

}

export default SelectList