import getTable from "./callAPI";

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
    return [appearanceProb, sumofLevelProb];
    
  }catch(e){
    console.log("getProbability error, ", e);
    return [false, false];
  }
}

function getFinalProb(option_probs, level_probs){
  const weight = option_probs.length > 1 ? 6 : 3;
  const KEEP = 1000000000000; // 1조

  let sumofOptionProbs = 0;
  for(let i=0; i<option_probs.length; i++) sumofOptionProbs += option_probs[i];

  for(let i=option_probs.length; i<3; i++){
      option_probs.push(100-sumofOptionProbs);
      level_probs.push(100);
  }

  let result = option_probs[0] * level_probs[0];
  for(let i=1; i<3; i++){
      let tmp = option_probs[i] * level_probs[i];
      result = Math.floor(result * tmp * KEEP) / KEEP;
  }
  
  result *= weight;
  result = result / (Math.pow(10000, option_probs.length));
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
    const option_probs = [];
    const level_probs = [];
    // 옵션 별 등장 확률
    for(let idx in Info.options){
      let [prob, level] = getProb(table[Info.options[idx]], Info.levels[idx]);
      if(prob === false){
        return false; // 등장하지 않는 옵션이 포함
      }
      option_probs.push(prob);
      level_probs.push(level);
    }
    // 옵션이 함께 등장할 확률
    return getFinalProb(option_probs, level_probs);
}