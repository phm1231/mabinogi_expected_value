// 소수점 이하에서 최초 숫자가 몇 번째에 등장하는지.
function getRoundDigit(prob){
    const maxValue = 16;

    try{
        // 지수표현식 제거
        const under_str = prob.toFixed(20).split(".")[1];

        for(let idx=0; idx < under_str.length; idx++){
            if(under_str[idx] !== "0"){
                return idx;
            }
        }
        return maxValue;
    }
    catch(e){
        console.log("getRoundDigit: ", e);
        return maxValue;
    }
}

export default getRoundDigit;