const express = require('express');
const router = express.Router();
const {advanced, elaborate}= require('./data/table/table.js');

function normalization(str){
    return str.normalize("NFC");
}

function mergeTable(rank, advanced_item, elaborate_item, race, bUseAdvTable){
    const s = new Set();

    // 정세공부터
    if(elaborate.hasOwnProperty(rank) && elaborate[rank].hasOwnProperty(elaborate_item) &&
        elaborate[rank][elaborate_item].hasOwnProperty(race)){
            console.log(Object.keys(elaborate[rank][elaborate_item][race]));
        }

    if(bUseAdvTable &&
        advanced.hasOwnProperty(rank) && advanced[rank].hasOwnProperty(advanced_item) &&
        advanced[rank][advanced_item].hasOwnProperty(race)){
            console.log(Object.keys(advanced[rank][advanced_item][race]));
        }
    return s;
}

router.get("/", (req, res)=>{

    let bUseAdvTable = true;

    if(req.query.rank === undefined && req.query.item === undefined && req.query.race === undefined){
        res.status(404).send("/options, Param Error");
        return;
    }

    try{
        const rank = normalization(req.query.rank) || 0;
        let item = normalization(req.query.item) || 0;
        const race = normalization(req.query.race) || 0;

        if(rank === 0 || item === 0 || race === 0){
            res.status(404).send("/options Param Error");
            return;
        }

        // 정교한 세공 도구 아이템 이름 결정
        const classic_str = normalization('클래식 정령 ');
        const fullswing_str = normalization('자이언트 풀 스윙 ');
        const axe_str = normalization('양손 도끼');
        const blunt_str = normalization('양손 둔기');
        let elaborate_item = item;

        if(elaborate_item.includes(classic_str)){
            elaborate_item = elaborate_item.replace(classic_str, '');
        }
        if(elaborate_item.includes(fullswing_str)){
            if(item.includes(axe_str)) elaborate_item = axe_str;
            else if(item.includes(blunt_str)) elaborate_item = blunt_str;
        }

        // 고급 세공 도구에서 통합하기 어려운 예외 아이템 타입에 대해서
        let exception_types = [normalization("레이피어"), normalization("셰프의 거친 손길"),
            normalization("마력 너클"), normalization("대형 낫"), normalization("썬로드 콜트"),
            normalization("양손 도끼"), normalization("양손 둔기")];
        if(exception_types.includes(item)){
            bUseAdvTable = false;
        }
        const mt = mergeTable(rank, item, elaborate_item, race, bUseAdvTable);
        console.log(mt);
        res.status(200).send(mt);

    }catch(e){
        console.log(e);
        res.status(404).send("Bad Request...");
    }
})

module.exports = router;