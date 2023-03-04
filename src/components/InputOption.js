import React, {useEffect, useState} from "react";
import SelectList from "./SelectList";
import SelectOptions from "./SelectOptions";
import "./component.css";
import makeOption from "../module/makeOption";
import ShowResult from "./showResult";
import subBtnImg from "../img/sub.png"
import addBtnImg from "../img/add.png"

import getTable from "../module/callAPI";
import checkTable from "../module/checkTable";

function InputOption(props){
    const [itemType, setItemType] = useState("itemType");
    const [race, setRace] = useState("race");
    const [rank, setRank] = useState("rank");
    const [visible, setVisible] = useState(false);

    const [optionArr, setOptionArr] = useState([]);
    const [levelArr, setLevelArr] = useState([]);
    const [countList, setCountList] = useState([0]);

    const [isOpen, setIsOpen] = useState(false);

    const [oldTable, setOldTable] = useState({});
    const [newTable, setNewTable] = useState({});

    useEffect(()=>{
        async function fetchTable() {
            const oldTableData = await getTable("advanced");
            const newTableData = await getTable("elaborate");
            setOldTable(oldTableData);
            setNewTable(newTableData);
          }
          fetchTable();
    }, [])

    useEffect(()=>{
        if(
            itemType !== "itemType" && race !== "race" && rank !== "rank" &&
            ( checkTable(oldTable, rank, itemType, race) || checkTable(newTable, rank, itemType, race) ))
//            (oldTable[rank][itemType][race] !== undefined || newTable[rank][itemType][race] !== undefined ))
//            Object.keys(table[toolNames[0]][rank][itemType][race]).length > 1)
            {
                setVisible(true);
            }
        else{
            setVisible(false);
        }

    }, [rank, itemType, race])

    const initOptions = () =>{
        setCountList([0]);
        setOptionArr([]);
        setLevelArr([]);
        setVisible(false);
    }

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

            let newOptionArr = [];
            let newLevelArr = [];
            for(let i=0; i<countArr.length; i++){
                newOptionArr[i] = optionArr[i];
                newLevelArr[i] = levelArr[i];
            }
            setOptionArr(newOptionArr);
            setLevelArr(newLevelArr);
        }
    }

    const onChangeItemType = (value) =>{
        initOptions();        
        setItemType(value);
    }

    const onChangeRace = (value) =>{
        initOptions();
        setRace(value);
    }

    const onChangeRank = (value) =>{
        initOptions();
        setRank(value);
    }

    const onSubmit = () =>{   
        onOpenModal();
    }

    const onOpenModal = () =>{
        setIsOpen(true);
    }
    
    const onCloseModal = () =>{
        setIsOpen(false);
    }

    return (
        // props.name 으로 수정
        <div>
            <ShowResult isOpen={isOpen} onClose={onCloseModal} 
                Info={{"rank": rank, "item": itemType, "race": race, "options": optionArr, "levels": levelArr}}>
            </ShowResult>
            <div>
                <h3>옵션 설정</h3>
                <div className="Box">
                    <div className="optionSettingBox">
                        <SelectList content="rank" placeholder="랭크" setValue={onChangeRank}></SelectList>
                        <SelectList content="type" placeholder="아이템 타입" setValue={onChangeItemType}></SelectList>
                        <SelectList content="race" placeholder="종족" setValue={onChangeRace}></SelectList>
                    </div>
                </div>
            </div>
            {
                visible &&
                <div className="Box">
                    <h3>옵션 선택</h3>
                    <div className="optionSelectBox">
                        {countList && countList.map((item, i) => (
                            <div key={i} className="optionSelectItem">
                                <SelectOptions
                                    index={i}
                                    itemType={itemType} race={race} rank={rank}
                                    onChangeOption={onChangeOption} onChangeLevel={onChangeLevel}
                                    selectedOption={optionArr[i]}
                                />
                            </div>
                        ))}
                        <div className="buttonContainer">
                            <button className="iconBtn" onClick={addCount}><img className="btnImg" src={addBtnImg}/></button>
                            <button className="iconBtn" onClick={subCount}><img className="btnImg" src={subBtnImg}/></button>
                        </div>
                    </div>
                    <div className="wrapperBtn">
                        <button className="w-btn w-btn-indigo" type="button" onClick={onSubmit}>계산하기</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default InputOption; 