import axios from 'axios';

const prob_url = "http://localhost:3001/probs/";
const option_url = "http://localhost:3001/options";
const logger_url = "http://localhost:3001/logs";

const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Basic ' + api_key ~~
}

export default async function getTable(toolname, rank=undefined, item=undefined, race=undefined){
    const res = await axios.get(prob_url + toolname,{
        params:{
            "rank": rank,
            "item": item,
            "race": race
        }
    });
    return res.data;
}
 
export async function getOption(rank, item, race){
    const res = await axios.get(option_url, {
        params:{
            "rank": rank,
            "item": item,
            "race": race
        }
    });
    return res.data;
}

export async function postOption(rank, item, race, options, levels){
    const sendData = {
        "rank": rank,
        "item": item,
        "race": race,
        "options": options,
        "levels": levels
    }
    const res = await axios.post(logger_url, sendData, {headers});
    console.log(res);
    return;
}