import React, {useState, useEffect} from "react";
import axios from 'axios';
import InputPrice from "./InputPrice";
import ELABORATE_IMG from "../img/ELABORATE.png"; // 정교한
import BRILLIANT_IMG from "../img/BRILLIANT.png"; // 영롱한
import ADVANCED_IMG from "../img/ADVANCED.png"; // 고급
import CREDNE_IMG from "../img/CREDNE.png"; // 크레드네
import KINDPLUS_IMG from "../img/KINDPLUS.png"; // 착세플
import MEMORIZE_IMG from "../img/MEMORIZE.png"; // 기억

function getToolImg(name){
    switch(name){
        case "정교한 세공 도구".normalize("NFD"):
            return ELABORATE_IMG;
        case "영롱한 세공 도구".normalize("NFD"):
            return BRILLIANT_IMG;
        case "고급 세공 도구".normalize("NFD"):
            return ADVANCED_IMG;
        case "크레드네의 세공 도구".normalize("NFD"):
            return CREDNE_IMG;
        case "착한 세공 도구 PLUS".normalize("NFD"):
            return KINDPLUS_IMG;
        case "기억의 세공 도구".normalize("NFD"):
            return MEMORIZE_IMG;
        default:
            break;
    }
}

function getPrice(name){
    switch(name){
        case "정교한 세공 도구".normalize("NFD"):
            return 1500000;
        case "영롱한 세공 도구".normalize("NFD"):
            return 2000000;
        case "고급 세공 도구".normalize("NFD"):
            return 1000000;
        case "크레드네의 세공 도구".normalize("NFD"):
            return 3000000;
        case "착한 세공 도구 PLUS".normalize("NFD"):
            return 2000000;
        case "기억의 세공 도구".normalize("NFD"):
            return 1000000;
        default:
            break;
    }
}

function ResultContent(props){
    const prob = props.prob;
    const count = props.count;
    const srcImg = getToolImg(props.name);
    const [price, setPrice] = useState(getPrice(props.name));
    const [testData, setTestData] = useState("");

    const onChangePrice = (value)=>{
        setPrice(value);
    }

    async function testFunc(){
        let sendData = {name: props.name};
        const res = await axios.post('http://localhost:3001/text', sendData);
        console.log(res);
        setTestData(res.data.data);
    }

    async function routerTest(){
        let sendData = {name: props.name};
        const res = await axios.post('http://localhost:3001/api', sendData);
        console.log("Call TestFunc");
    }

    if(prob !== false){
//        testFunc();
        routerTest();
        return(
            <div className="resultTableCell">
                    <p>
                        <img className="toolImg" src={srcImg} alt="toolImg"></img>
                        {props.name}
                    </p>
                    <p>
                        개당 가격: 
                        <InputPrice placeholder={price} onChange={onChangePrice}></InputPrice>
                    </p>
                    <p>1회 당 등장 확률: {prob.toFixed(20)}%</p>
                    <p>예상 소모 개수: {count}개</p>
                    <p>기대 Gold: {(count * price).toLocaleString()}</p>
            </div>
        )
    }
    return(
        <div className="resultTableCell">
            <p>
                <img className="toolImg" src={srcImg} alt="toolImg"></img>
                {props.name}
            </p>
            <p>
                등장할 수 없는 옵션입니다.
            </p>
        </div>
    )
}

export default ResultContent;