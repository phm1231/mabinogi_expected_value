const express = require('express');
const router = express.Router();
const {toolnames} = require('../data/table/toolnames.js');
const tables = require('../data/table/table.js');

function normalization(str){
    return str.normalize("NFC");
}

router.get("/:toolname", (req, res)=>{
    let toolname = normalization(req.params.toolname.toLowerCase()) || 0;
    if(!Object.keys(toolnames).includes(toolname.toUpperCase())){
        res.status(404).send("Not toolname");
        return;
    }

    if(req.query.rank === undefined && req.query.item === undefined && req.query.race === undefined){
        res.status(200).send(tables[toolname]);
        return;
    }

    try{
        const rank = normalization(req.query.rank) || 0;
        let item = normalization(req.query.item) || 0;
        const race = normalization(req.query.race) || 0;

        if(rank === 0 || item === 0 || race === 0){
            res.send("No param");
            return;
        }

        // 신 세공 테이블에 존재하지 않는 아이템 타입 변환
        if(toolname === normalization("elaborate") || toolname === normalization("brilliant")){
            const classic_str = normalization('클래식 정령 ');
            const fullswing_str = normalization('자이언트 풀 스윙 ');
            const axe_str = normalization('양손 도끼');
            const blunt_str = normalization('양손 둔기');

            if(item.includes(classic_str)){
                item = item.replace(classic_str, '');
            }
            if(item.includes(fullswing_str)){
                if(item.includes(axe_str)) item = axe_str;
                else if(item.includes(blunt_str)) item = blunt_str;
            }
        }

        else if(toolname === "advanced"){
            let special_weapons = [normalization("레이피어"), normalization("셰프의 거친 손길"),
                normalization("마력 너클"), normalization("대형 낫"), normalization("썬로드 콜트")];
            for(let i=0; i<special_weapons.length; i++) special_weapons[i] = normalization(special_weapons[i]);
            if(special_weapons.includes(item)){
                res.status(200).send("No Special Weapon");
                return;
            }
        }

        if( tables[toolname].hasOwnProperty(rank) &&
            tables[toolname][rank].hasOwnProperty(item) &&
            tables[toolname][rank][item].hasOwnProperty(race))
            {
                res.status(200).send(tables[toolname][rank][item][race]);
                return;
            }

    }catch(e){
        console.log(e);
        res.status(404).send("Bad Request...");
    }
})

module.exports = router;