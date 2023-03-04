import React, {useState, useEffect} from "react";
import SelectList from "./SelectList";
import table from "../data/table.json";
import makeOption from "../module/makeOption";
import "./component.css"
 
function SelectOption(props){

    // Table을 새로 api 만들어서 변경.
    const smallTable = table['정교한 세공 도구'.normalize("NFD")][props.rank][props.itemType][props.race];
    const tableOptions = Object.keys(smallTable); 
    const itemOptions = makeOption(tableOptions);

    const onChangeOption = (option, index) =>{
        props.onChangeOption(option, index);
    }
    const onChangeLevel = (level, index) =>{
        props.onChangeLevel(level, index);
    }

    return(
        <div>
            <SelectList content="option" placeholder="아이템 옵션" 
                index={props.index}
                value={props.selectedOption}
                setValue={onChangeOption}
                options={itemOptions}>    
            </SelectList>
            {
                props.selectedOption !== undefined &&
                smallTable[props.selectedOption.normalize("NFC")] !== undefined &&
                <SelectList content="level" placeholder="레벨" 
                    index={props.index}
                    setValue={onChangeLevel}
                    options={makeOption(Object.keys(smallTable[props.selectedOption.normalize("NFC")]))}>
                </SelectList>
            }
        </div>
    )

}

export default SelectOption;