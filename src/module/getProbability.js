// option 당 확률을 구하는 함수
// 세공 도구는 3줄이므로, 추가 연산이 필요하다.

import getTable from "./callAPI";

function getProb(probTable, level){

  try{
    const appearanceProb = Number(probTable["0"].replace("%", ""));
    let sumofLevelProb = 0;
    const keys = Object.keys(probTable);
    let idx = keys.indexOf(level.toString());

    if(idx === -1) idx = 1; // 레벨을 찾을 수 없는 경우

    for(; idx < keys.length; idx++){
      sumofLevelProb += Number(probTable[keys[idx]].replace("%", ""));
    }
    return appearanceProb*sumofLevelProb / 10000; // (등장확률*0.01) * (레벨확률*0.01)
    
  }catch(e){
    console.log("getProbability error, ", e);
    return false;
  }
}

function getFinalProb(probs){
  const weight = probs.length % 3 * 3; // 옵션의 개수가 1이면 3, 2이면 6, 3이면 0

  let result = probs[0];
  for(let i=1; i<probs.length; i++){
      result *= probs[i];
  }

  if(weight !== 0) result *= weight;

  return result;
}

export async function getProbability(toolnameForAPI, Info){
    const table = await getTable(toolnameForAPI, Info.rank, Info.item, Info.race);
    const probs = [];
    // 옵션 별 등장 확률
    for(let idx in Info.options){
      const prob = getProb(table[Info.options[idx]], Info.levels[idx]);
      if(prob === false){
        return false; // 등장하지 않는 옵션이 포함
      }
      probs.push(prob)
    }
    // 옵션이 함께 등장할 확률
    return getFinalProb(probs);
}