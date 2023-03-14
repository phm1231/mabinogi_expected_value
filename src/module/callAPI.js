import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Basic ' + api_key ~~
}

export default async function getTable(toolname, rank=undefined, item=undefined, race=undefined){
    const res = await axios.get("/probs/" + toolname, {
        params:{
            "rank": rank,
            "item": item,
            "race": race
        }
    });
    return res.data;
}
 
export async function getOption(rank, item, race){
    const res = await axios.get("/options", {
        params:{
            "rank": rank,
            "item": item,
            "race": race
        }
    });
    return res.data;
}

/* 추후 업데이트 예정
export async function postOption(rank, item, race, options, levels){
    const sendData = {
        "rank": rank,
        "item": item,
        "race": race,
        "options": options,
        "levels": levels
    }
    const res = await axios.post("/logs", sendData, {headers});
    return;
}

export async function login(){
    const res = await axios.get("/login");
}
*/