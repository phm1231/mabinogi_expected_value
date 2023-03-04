const express = require('express');
const router = express.Router();
const {toolnames} = require('../data/table/toolnames.js');
const tables = require('../data/table/table.js');

router.get("/", (req, res)=>{
    const keys = Object.keys(tables);
    keys.forEach((value, index, array)=>{
        console.log(tables[value]);
    })
    res.send("Hello");
})

router.get("/:toolname", (req, res)=>{
    let toolname = req.params.toolname.toLowerCase() || 0;

    if(!Object.keys(toolnames).includes(toolname.toUpperCase())){
        res.status(404).send("Not toolname");
        return;
    }

    if(req.query.rank === undefined && req.query.item === undefined && req.query.race === undefined){
        res.send(tables[toolname]);
        return;
    }

    try{
        const rank = req.query.rank.normalize("NFD") || 0;
        let item = req.query.item.normalize("NFD") || 0;
        const race = req.query.race.normalize("NFD") || 0;

        if(rank === 0 || item === 0 || race === 0){
            res.send("No param");
            return;
        }

        // 신 세공 테이블에 존재하지 않는 아이템 타입 변환
        if(toolname === "elaborate" || toolname === "brilliant"){
            const classic_str = '클래식 정령 '.normalize("NFD");
            const fullswing_str = '자이언트 풀 스윙 '.normalize("NFD");
            const axe_str = '양손 도끼'.normalize("NFD");
            const blunt_str = '양손 둔기'.normalize("NFD");

            if(item.includes(classic_str)){
                item = item.replace(classic_str, '');
            }
            if(item.includes(fullswing_str)){
                if(item.includes(axe_str)) item = axe_str;
                else if(item.includes(blunt_str)) item = blunt_str;
            }
        }
        // 교역 세공 도구
        else if(toolname === "commerce"){
            if(item === "천옷") item = "교역 강화 의상이 아닌 옷".normalize("NFD");
            else if(item === "천옷(교역 강화 의상)") item = "교역 강화 의상".normalize("NFD");
        }

        // 구 세공 테이블에 존재하지 않는 아이템 타입은 어떻게 처리해주어야 할까에 대해 고민 필요.
        else if(toolname === "advanced"){
            let special_weapons = ["레이피어", "셰프의 거친 손길", "마력 너클", "대형 낫", "썬로드 콜트"];
            for(let i=0; i<special_weapons.length; i++) special_weapons[i] = special_weapons[i].normalize("NFD");
            if(special_weapons.includes(item)){
                res.status(200).send(false);
                return;
            }
        }
        res.status(200).send(tables[toolname][rank.normalize("NFC")][item.normalize("NFC")][race.normalize("NFC")]); // [item][race]); // [item][race]);

    }catch(e){
        console.log(e);
        res.status(404).send("Bad Request...");
    }

})



router.post("/", (req, res)=>{
    console.log("Here is Index Post");
    return "Post";
})

module.exports = router;