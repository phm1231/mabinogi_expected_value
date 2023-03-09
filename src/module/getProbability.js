import getTable from "./callAPI";

// 1개의 옵션이 level 이상 등장할 확률.
function getProb(probTable, level){
  try{
    const appearanceProb = Number(probTable["0"].replace("%", ""));
    let sumofLevelProb = 0;
    const keys = Object.keys(probTable);
    let idx = keys.indexOf(level.toString());
    // 테이블에서 레벨을 찾을 수 없는 경우
    if(idx === -1){
      // 입력한 레벨이 너무 작은 경우
      if(level < Number(keys[1])) idx = 1;
      // 입력한 레벨이 너무 큰 경우
      else if(level > Number(keys[keys.length - 1])) return false;
    }
    for(; idx < keys.length; idx++){
      sumofLevelProb += Number(probTable[keys[idx]].replace("%", ""));
    }
    return appearanceProb*sumofLevelProb; // / 10000; // (등장확률*0.01) * (레벨확률*0.01)
    
  }catch(e){
    console.log("getProbability error, ", e);
    return false;
  }
}

function getFinalProb(probs){
  const weight = probs.length % 3 * 3; // 옵션의 개수가 1이면 3, 2이면 6, 3이면 0
  const KEEP = 1000000000000; // 1조
  let result = probs[0];
  for(let i=1; i<probs.length; i++){
      result = Math.floor(result * probs[i] * KEEP) / KEEP;
  }
  
  if(weight !== 0) result *= weight;
  result = result / (Math.pow(10000, probs.length));
  return result;
}

export function getAverageExpectedCount(prob){
  return Math.floor(1 / prob);
}

export function getMaximumExpectedCount(prob){
  const logValue = Math.log(1 - prob);
  const under_point = prob.toFixed(20).split('.')[1];
  let minValue = "0.";

  for(let item of under_point){
    if(item !== "0"){
      minValue += "04";
      break;
    }
    minValue += item;
  }
  const maximumExpectedCount = Math.log(parseFloat(minValue)) / logValue;
  return Math.floor(maximumExpectedCount);
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