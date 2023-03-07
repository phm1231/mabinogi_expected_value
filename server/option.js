const express = require('express');
const router = express.Router();
const {advanced, elaborate, commerce}= require('./data/table/table.js');

function normalization(str){
    return str.normalize("NFC");
}

function mergeTable(rank, advanced_item, elaborate_item, race, bUseAdvancedTable, bUseCommerceTable){
    const mergedOptionTable = {};

    // 정세공
    if(elaborate.hasOwnProperty(rank) && elaborate[rank].hasOwnProperty(elaborate_item) &&
        elaborate[rank][elaborate_item].hasOwnProperty(race)){
            for( let [key, value] of Object.entries(elaborate[rank][elaborate_item][race])){
                mergedOptionTable[key] = {};

                const minLevel = Number(Object.keys(value)[1]); // [0]은 등장 확률
                const maxLevel = Number(Object.keys(value)[Object.keys(value).length - 1]);

                if(mergedOptionTable.hasOwnProperty(key)){
                    if(mergedOptionTable[key].hasOwnProperty("0")){
                        const tmp = Number(mergedOptionTable[key]["0"]);
                        mergedOptionTable[key]["0"] = tmp < minLevel ? tmp : minLevel;
                    }
                    else{
                        mergedOptionTable[key]["0"] = minLevel;
                    }
                    if(mergedOptionTable[key].hasOwnProperty("1")){
                        const tmp = Number(mergedOptionTable[key]["1"]);
                        mergedOptionTable[key]["1"] = tmp > maxLevel ? tmp : maxLevel;
                    }
                    else{
                        mergedOptionTable[key]["1"] = maxLevel;
                    }

                }
            }
        }

    // 고세공
    if(bUseAdvancedTable &&
        advanced.hasOwnProperty(rank) && advanced[rank].hasOwnProperty(advanced_item) &&
        advanced[rank][advanced_item].hasOwnProperty(race)){
            for( let [key, value] of Object.entries(advanced[rank][advanced_item][race])){
                const minLevel = Number(Object.keys(value)[1]); // [0]은 등장 확률
                const maxLevel = Number(Object.keys(value)[Object.keys(value).length - 1]);

                if(mergedOptionTable.hasOwnProperty(key)){
                    if(mergedOptionTable[key].hasOwnProperty("0")){
                        const tmp = Number(mergedOptionTable[key]["0"]);
                        mergedOptionTable[key]["0"] = tmp < minLevel ? tmp : minLevel;
                    }
                    else{
                        mergedOptionTable[key]["0"] = minLevel;
                    }
                    if(mergedOptionTable[key].hasOwnProperty("1")){
                        const tmp = Number(mergedOptionTable[key]["1"]);
                        mergedOptionTable[key]["1"] = tmp > maxLevel ? tmp : maxLevel;
                    }
                    else{
                        mergedOptionTable[key]["1"] = maxLevel;
                    }

                }
            }
        }

    // 교세공
    const commerce_item = advanced_item;
    if(bUseCommerceTable &&
        commerce.hasOwnProperty(rank) && commerce[rank].hasOwnProperty(commerce_item) &&
        commerce[rank][commerce_item].hasOwnProperty(race)){
            for( let [key, value] of Object.entries(commerce[rank][commerce_item][race])){
                const minLevel = Number(Object.keys(value)[1]); // [0]은 등장 확률
                const maxLevel = Number(Object.keys(value)[Object.keys(value).length - 1]);

                if(mergedOptionTable.hasOwnProperty(key)){
                    if(mergedOptionTable[key].hasOwnProperty("0")){
                        const tmp = Number(mergedOptionTable[key]["0"]);
                        mergedOptionTable[key]["0"] = tmp < minLevel ? tmp : minLevel;
                    }
                    else{
                        mergedOptionTable[key]["0"] = minLevel;
                    }
                    if(mergedOptionTable[key].hasOwnProperty("1")){
                        const tmp = Number(mergedOptionTable[key]["1"]);
                        mergedOptionTable[key]["1"] = tmp > maxLevel ? tmp : maxLevel;
                    }
                    else{
                        mergedOptionTable[key]["1"] = maxLevel;
                    }

                }
            }
        }

    return mergedOptionTable;
}

router.get("/", (req, res)=>{

    let bUseAdvancedTable = true;
    let bUseCommerceTable = false;

    if(req.query.rank === undefined && req.query.item === undefined && req.query.race === undefined){
        res.status(404).send("/options, Param Error");
        return;
    }

    try{
        const rank = normalization(req.query.rank) || 0;
        let item = normalization(req.query.item) || 0;
        const race = normalization(req.query.race) || 0;

        if(rank === 0 || item === 0 || race === 0){
            res.status(404).send("/options, Param Error");
            return;
        }

        // 정교한 세공 도구에 존재하지 않는 아이템 타입에 대하여 아이템 타입 매치
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

        // 고급 세공 도구에서 통합하기 어려운 예외 아이템 타입에 대해서 처리
        let exception_types = [normalization("레이피어"), normalization("셰프의 거친 손길"),
            normalization("마력 너클"), normalization("대형 낫"), normalization("썬로드 콜트"),
            normalization("양손 도끼"), normalization("양손 둔기")];
        if(exception_types.includes(item)){
            bUseAdvancedTable = false;
        }

        // 교역 세공 도구 포함 여부 처리
        let commerce_types = [normalization("천옷(교역 강화 의상)"), normalization("천옷"),
        normalization("중갑옷"), normalization("경갑옷")];
        if(commerce_types.includes(item)){
            bUseCommerceTable = true;
        }

        const mt = mergeTable(rank, item, elaborate_item, race, bUseAdvancedTable, bUseCommerceTable);
        res.status(200).send(mt);

    }catch(e){
        console.log("option.js: ", e);
        res.status(404).send("Bad Request...");
    }
})

module.exports = router;