import React from "react";
import SelectList from "./SelectList";
import table from "../data/table.json";
import makeOption from "../module/makeOption";
import "./component.css"

/*
async function getTable(toolname, rank, itemtype, race){
    await axios.get
}
*/
 
function SelectOption(props){

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
                smallTable[props.selectedOption] !== undefined &&
                <SelectList content="level" placeholder="레벨" 
                    index={props.index}
                    setValue={onChangeLevel}
                    options={makeOption(Object.keys(smallTable[props.selectedOption]))}>
                </SelectList>
            }
        </div>
    )

}

export default SelectOption;