import React, {useState, useEffect} from "react";
import InputPrice from "./InputPrice";
import {getToolImg, getPrice} from "../data/tools"
import {getProbability} from "../module/getProbability";

function ResultContent(props){
    const toolname = props.toolname;
    const toolnameForAPI = props.toolnameForAPI;
    const Info = props.Info;
    const ROUND_DIGIT = 20;

    const srcImg = getToolImg(toolname);
    const [price, setPrice] = useState("");
    const [prob, setProb] = useState(false);


    useEffect(()=>{
        async function fetchData(){
            const tmpProb = await getProbability(toolnameForAPI, Info);
            setProb(tmpProb);
            setPrice(getPrice(toolname));
        }
        fetchData();
    }, [])


    const onChangePrice = (value)=>{
        setPrice(value);
    }

    if(prob !== false){ // 확률 구하는데 성공한다면
        const outputProb = prob * 100;
        const expectedCount = Math.round(1 / prob);
        return(
            <div className="resultTableCell">
                    <p>
                        <img className="toolImg" src={srcImg} alt="toolImg"></img>
                        {toolname}
                    </p>
                    <div>
                        개당 가격: 
                        <InputPrice placeholder={price} onChange={onChangePrice}></InputPrice>
                    </div>
                    <p>1회 당 등장 확률: {outputProb.toFixed(ROUND_DIGIT)}%</p>
                    <p>예상 소모 개수: {expectedCount}개</p>
                    <p>기대 Gold: {(expectedCount * price).toLocaleString()}</p>
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