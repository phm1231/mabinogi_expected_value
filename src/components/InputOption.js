import React, {useEffect, useState} from "react";
import SelectList from "./SelectList";
import SelectOptions from "./SelectOptions";
import "./component.css";
import makeOption from "../module/makeOption";
import table from "../data/table.json";

function InputOption(props){
    const [itemType, setItemType] = useState("itemType");
    const [race, setRace] = useState("race");
    const [rank, setRank] = useState(0);
    const [visible, setVisible] = useState(false);

    const [optionArr, setOptionArr] = useState(["", "", ""]);
    const [levelArr, setLevelArr] = useState([0, 0, 0]);
    const [countList, setCountList] = useState([0]);

    const toolNames = Object.keys(table);
    const ranks = Object.keys(table[toolNames[0]]);
    const itemTypes = Object.keys(table[toolNames[0]][ranks[0]]);
    const races = Object.keys(table[toolNames[0]][ranks[0]][itemTypes[0]]);

    const rankOptions = makeOption(ranks);
    const itemOptions = makeOption(itemTypes);
    const raceOptions = makeOption(races);

    useEffect(()=>{
        if(
            itemType !== "itemType" && race !== "race" && rank !== 0 &&
            table[toolNames[0]][rank][itemType][race] !== undefined &&
            Object.keys(table[toolNames[0]][rank][itemType][race]).length > 1)
            {
                setVisible(true);
            }
        else{
            setVisible(false);
        }

    }, [rank, itemType, race])

    const onChangeOption = (value, index) =>{
        let newOptionArr = [...optionArr];
        newOptionArr[index] = value;
        setOptionArr(newOptionArr);
    }

    const onChangeLevel = (value, index) =>{
        let newLevelArr = [...levelArr];
        newLevelArr[index] = value;
        setLevelArr(newLevelArr);
    }

    const addCount = () =>{
        if(countList.length < 3){
            let countArr = [...countList];
            let counter = countArr.slice(-1)[0]; // 마지막 원소
            countArr.push(counter+1);
            setCountList(countArr);
        }
    }
    
    const subCount = () =>{
        if(1 < countList.length){
            let countArr = [...countList];
            countArr.pop();
            setCountList(countArr);
        }
    }

    const onChangeItemType = (value) =>{
        setItemType(value);
        setCountList([0]);
        setOptionArr(["", "", ""]);
        setLevelArr([0, 0, 0]);
    }

    const onChangeRace = (value) =>{
        setRace(value);
        setCountList([0]);
        setOptionArr(["", "", ""]);
        setLevelArr([0, 0, 0]);
    }

    const onChangeRank = (value) =>{
        setRank(value);
        setCountList([0]);
        setOptionArr(["", "", ""]);
        setLevelArr([0, 0, 0]);
    }

    const onSubmit = () =>{
        console.log("rank: " + rank);
        console.log("item: " + itemType);
        console.log("race: " + race);
        for(let i=0; i<countList.length; i++){
            console.log("optionArr[" + i + "]: " + optionArr[i]);
            console.log("levelArr[" + i + "]: " + levelArr[i]);
        }
        // 오류처리 부분 추가하기.
    }

    return (
        // props.name 으로 수정
        <div>
            <h3>옵션 설정</h3>
            <div className="optionInputBox">
                <SelectList disabled="false" placeholder="랭크" setValue={onChangeRank} options={rankOptions}></SelectList>
                <SelectList disabled="false" placeholder="아이템 타입" setValue={onChangeItemType} options={itemOptions}></SelectList>
                <SelectList disabled="false" placeholder="종족" setValue={onChangeRace} options={raceOptions}></SelectList>
            </div>
            {
                visible &&
                <div>
                    <h3>옵션 선택</h3>
                    <div className="optionInputBox">
                        {countList && countList.map((item, i) => (
                            <SelectOptions
                                index={i}
                                itemType={itemType} race={race} rank={rank}
                                onChangeOption={onChangeOption} onChangeLevel={onChangeLevel}
                                selectedOption={optionArr[i]}
                                addCount={addCount} subCount={subCount}
                            />
                        ))}
                    </div>
                    <button className="submitBtn" onClick={onSubmit}>Submit</button>
                </div>
            }
        </div>
    )
}

export default InputOption;