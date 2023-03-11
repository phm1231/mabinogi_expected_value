import React, {useState, useEffect} from "react";
import SelectList from "./SelectList";
import {getOption} from "../module/callAPI.js";
import makeOption from "../module/makeOption";
import "./component.css"
 
function SelectOption(props){

    const [optionAndLevel, setOptionAndLevel] = useState({});
    const [optionlist, setOptionlist] = useState({});
    const [levellist, setLevellist] = useState({});
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    useEffect(()=>{
        async function fetchOptionAndLevel() {
            const optionAndLevel = await getOption(props.rank, props.itemType, props.race);
            setOptionAndLevel(optionAndLevel);
            setOptionlist(makeOption(Object.keys(optionAndLevel)));
          }
          fetchOptionAndLevel();
    }, [])

    useEffect(()=>{
        if(optionAndLevel !== {} && selectedOption !== ""){
            const minLevel = Number(optionAndLevel[selectedOption.normalize("NFC")]["0"]);
            const maxLevel = Number(optionAndLevel[selectedOption.normalize("NFC")]["1"]);

            let levelArr = [];
            for(let i=minLevel; i<=maxLevel; i++){
                levelArr.push(i)
            }
            setLevellist(makeOption(levelArr));
        }
        onChangeLevel("", props.index);

    }, [selectedOption])

    const onChangeOption = (option, index) =>{
        setSelectedOption(option);
        props.onChangeOption(option, index);
    }

    const onChangeLevel = (level, index) =>{
        setSelectedLevel(level);
        props.onChangeLevel(level, index);
    }

    return(
        <div>
            <SelectList content="option" placeholder="아이템 옵션을 선택해주세요." 
                index={props.index}
                value={selectedOption}
                setValue={onChangeOption}
                options={optionlist}>    
            </SelectList>
            {
                levellist.length !== undefined &&
                <SelectList content="level" placeholder="레벨" 
                    index={props.index}
                    value={selectedLevel}
                    setValue={onChangeLevel}
                    options={levellist}>
                </SelectList>
            }
        </div>
    )
}

export default SelectOption;