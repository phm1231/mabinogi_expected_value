import React  from 'react';
import table from "../data/table.json";
import tools from "../data/tools";
import './component.css';
import ResultTitle from "./resultTitle";
import ResultTable from "./resultTable";

// option 당 확률을 구하는 함수
// 세공 도구는 3줄이므로, 추가 연산이 필요하다.
function getProb(prob, option, level){
  const appearanceProb = prob[option]["0"];

  let sumofLevelProb = 0;
  const keys = Object.keys(prob[option]);

  let idx = keys.indexOf(level);
  if(idx === -1) idx = 1;
  for(; idx < keys.length; idx++){
    sumofLevelProb += Number(prob[option][keys[idx]]);
  }
  return appearanceProb*sumofLevelProb / 10000;
}

function getFinalProb(arr){
  let result = arr[0];
  for(let i=1; i<arr.length; i++){
      result *= arr[i];
  }
  return result;
}

function ExampleModal(props){
    const Info = props.Info;
    const ROUND_DIGIT = 20;
    const keys = Object.keys(tools);
    // option 중복 검사 추가 요망.

    let isSuccess = {};
    let finalProb = {};
    let expectedCount = {};

    if(!props.isOpen){
      return null;
    }
    
    for (let tool in tools){
      const toolName = tools[tool].normalize("NFD");
      let optionProbs = [];
      try{
        isSuccess[toolName] = true;

        const probability = table[toolName][Info.rank][Info.item][Info.race];

        for(let i=0; i<Info.options.length; i++){
          optionProbs.push(getProb(probability, Info.options[i], Info.levels[i]));
        }

        const weight = Info.options.length % 3 * 3;
        finalProb[toolName] = +((getFinalProb(optionProbs) * 100).toFixed(ROUND_DIGIT));
        if(weight !== 0) finalProb[toolName] *= weight;
        
        expectedCount[toolName] = Math.round(100 / finalProb[toolName]);

      }

      catch(error){
        isSuccess[toolName] = false;
        finalProb[toolName] = false;
        expectedCount[toolName] = false;
      }
    }

    for(let tool in tools){
      const toolName = tools[tool].normalize("NFD");
      console.log(tools[tool] + ": " + expectedCount[toolName]);
    }

    return (      
      <div>
        <div className='blackBackground'/>
        <div className="Modal">
          <ResultTitle options={Info.options} levels={Info.levels}>
            {
              keys.map((item, i)=>(
                <div key={i}>
                  <p>{tools[item] + ": " + expectedCount[tools[item].normalize("NFD")]}</p>
                </div>
              ))
            }
          </ResultTitle>
          <ResultTable probs={finalProb} counts={expectedCount}></ResultTable>
          <div className="wrapperBtn">
            <button className="w-btn w-btn-indigo" type="button" onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
};

export default ExampleModal;
