import React, {useState} from "react";
import SelectList from "./SelectList";
import table from "../data/table.json";
import makeOption from "../module/makeOption";
import subBtnImg from "../img/sub.png"
import addBtnImg from "../img/add.png"

import "./component.css"

// 대장장이망치, 공용, 옵션 및 레벨 설정 후 L로드, 공용으로 이동 시 입력 창이 사라지고 다시 존재하는 값으로 바꾸어도 대장장이 망치 외에는 돌아오지 않음
// 원하는 것: 이동 시 select 값 초기화 및 유지
// 예상 문제점: 값을 기억하면서 사라지나..?

function SelectOption(props){

    const smallTable = table['_정교한 세공 도구'.normalize("NFD")][props.rank][props.itemType][props.race];
    const tableOptions = Object.keys(smallTable); 
    const itemOptions = makeOption(tableOptions);

    const onChangeOption = (option, index) =>{
        props.onChangeOption(option, index);
    }
    const onChangeLevel = (level, index) =>{
        props.onChangeLevel(level, index);
    }
    // props.세공도구 추가 필요 props.itemType, race, rank

    return(
        <div className="optionSelectBox">
            <SelectList className="optionSelectItem" disabled="false" placeholder="아이템 옵션" index={props.index} setValue={onChangeOption} options={itemOptions}></SelectList>
            {
                smallTable[props.selectedOption] !== undefined &&
                <SelectList disabled="false" placeholder="레벨" index={props.index} setValue={onChangeLevel}
                    options={makeOption(Object.keys(smallTable[props.selectedOption]))}>
                </SelectList>
            }
            {
                props.index == 0 &&
                <div>
                    <button className="iconBtn" onClick={props.subCount}><img className="btnImg" src={subBtnImg}/></button>
                    <button className="iconBtn" onClick={props.addCount}><img className="btnImg" src={addBtnImg}/></button>
                </div>
            }

        </div>
    )
}

export default SelectOption;