import React from "react";
import Select from "react-select";
import "./component.css"
import makeOption from "../module/makeOption";
import ranks from "../data/ranks";
import itemtypes from "../data/itemtypes";
import races from "../data/races";

const selectStyles = {
    control: (base, state) => ({
      ...base,
      width: "inherit",
    }),
  };

function getOption(content){
    switch(content){
        case "rank":
            return makeOption(ranks);
        case "type":
            return makeOption(itemtypes);
        case "race":
            return makeOption(races);
        default:
            return false;
    }
}
// props must have <value, label>
function SelectList(props) {

    const changeValue = (index, e) =>{
        props.setValue(e.value, index);
    }

    if(props.content === "rank" || props.content === "type" || props.content === "race"){
        return (
            <Select
                options={getOption(props.content)}
                onChange={(e) => { changeValue(props.index, e) }}
                placeholder={props.placeholder}
            />
        )
    }
    else if(props.content === "option"){
        if(props.value === null || props.value === undefined || props.value === ""){
            return(
                    <Select
                        styles={selectStyles}
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
                    styles={selectStyles}
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
                value={
                    (props.value === null || props.value === undefined || props.value === "") ? 
                    null :
                    {value: props.value, label: props.value}}
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