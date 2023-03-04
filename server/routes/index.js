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

        // �� ���� ���̺� �������� �ʴ� ������ Ÿ�� ��ȯ
        if(toolname === "elaborate" || toolname === "brilliant"){
            const classic_str = 'Ŭ���� ���� '.normalize("NFD");
            const fullswing_str = '���̾�Ʈ Ǯ ���� '.normalize("NFD");
            const axe_str = '��� ����'.normalize("NFD");
            const blunt_str = '��� �б�'.normalize("NFD");

            if(item.includes(classic_str)){
                item = item.replace(classic_str, '');
            }
            if(item.includes(fullswing_str)){
                if(item.includes(axe_str)) item = axe_str;
                else if(item.includes(blunt_str)) item = blunt_str;
            }
        }
        // ���� ���� ����
        else if(toolname === "commerce"){
            if(item === "õ��") item = "���� ��ȭ �ǻ��� �ƴ� ��".normalize("NFD");
            else if(item === "õ��(���� ��ȭ �ǻ�)") item = "���� ��ȭ �ǻ�".normalize("NFD");
        }

        // �� ���� ���̺� �������� �ʴ� ������ Ÿ���� ��� ó�����־�� �ұ ���� ��� �ʿ�.
        else if(toolname === "advanced"){
            let special_weapons = ["�����Ǿ�", "������ ��ģ �ձ�", "���� ��Ŭ", "���� ��", "��ε� ��Ʈ"];
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