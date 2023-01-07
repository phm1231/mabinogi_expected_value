const iconv = require('iconv-lite');
const table = require('./data_loader');

function getExpectedValue(prob, option, level){

    const appearace_prob = parseFloat(prob[option]['0']) / 100;
    let level_prob = 0.0;
    let level_integer = parseInt(level);

    for (let i = level_integer; ; i++){
        const level_str = i.toString();

        if (prob[option][level_str] === undefined) break;
        else level_prob += parseFloat(prob[option][level_str]) / 100;
        
    }

    return appearace_prob * level_prob;

}

function test(){
    // mac os에서는 NFD 형식으로 normalize 필요함.
    // 파일에 저장되어있던 한글은 예외인듯함..
    const test_prob = table['_정교한 세공 도구'.normalize("NFD")]["_1랭크".normalize("NFD")]['_중갑옷'.normalize("NFD")]['_자이언트'.normalize("NFD")];
    console.log(getExpectedValue(test_prob, '연속기 : 스크류 어퍼 대미지(1레벨 당 6 % 증가)', '25'));
}

test();