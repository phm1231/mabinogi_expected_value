import React, {useState, useEffect} from "react";
import InputPrice from "./InputPrice";
import {getToolImg, getPrice} from "../data/tools"
import {getProbability, getMaximumExpectedCount, getAverageExpectedCount} from "../module/getProbability";
import moneyToString from "../module/moneyToString";
import getRoundDigit from "../module/getRoundDigit";

function ResultContent(props){
    const toolname = props.toolname;
    const toolnameForAPI = props.toolnameForAPI;
    const Info = props.Info;

    const srcImg = getToolImg(toolname);
    const [price, setPrice] = useState("");
    const [prob, setProb] = useState(false);


    useEffect(()=>{
        async function fetchData(){
            const tmpProb = await getProbability(toolnameForAPI, Info); // 1회 등장 확률
            setProb(tmpProb);
            setPrice(getPrice(toolname));
        }
        fetchData();
    }, [toolname, toolnameForAPI, Info])


    const onChangePrice = (value)=>{
        setPrice(value);
    }


    if(prob !== false){ // 확률 구하는데 성공한다면
        const outputProb = prob * 100;
        const expectedAverageCount = getAverageExpectedCount(prob);
        const expectedMaximumCount = getMaximumExpectedCount(prob);
        const averageGold = expectedAverageCount * price;
        const maximumGold = expectedMaximumCount * price;

        const CANNOT_CALCULATE = "계산 불가"
        const ROUND_DIGIT = (getRoundDigit(outputProb) + 4) % 20;

        return(
            <div className="resultTableCell">
                    <p>
                        <img className="toolImg" src={srcImg} alt="toolImg"></img>
                        {toolname}
                    </p>
                    <div>
                        개당 Gold: 
                        <InputPrice placeholder={price} onChange={onChangePrice}></InputPrice>
                    </div>
                    <p>1회 당 등장 확률: {outputProb.toFixed(ROUND_DIGIT) + "%"}</p>
                    <p>평균 기대 개수: {isFinite(expectedAverageCount) ? moneyToString(expectedAverageCount) + "개": CANNOT_CALCULATE}</p>
                    <p>상위 99% 개수: {isFinite(expectedMaximumCount) ? moneyToString(expectedMaximumCount) + "개": CANNOT_CALCULATE}</p>
                    <p>평균 기대 Gold: {isFinite(averageGold) ? moneyToString(averageGold) + " Gold": CANNOT_CALCULATE}</p>
                    <p>상위 99% Gold: {isFinite(maximumGold) ? moneyToString(maximumGold) + " Gold": CANNOT_CALCULATE}</p>
            </div>
        )
    }
    return(
        <div className="resultTableCell">
            <p>
                <img className="toolImg" src={srcImg} alt="toolImg"></img>
                {toolname}
            </p>
            <p>
                등장할 수 없는 옵션입니다.
            </p>
        </div>
    )
}

export default ResultContent;