import axios from 'axios';

const prob_url = "http://localhost:3001/probs/";
const option_url = "http://localhost:3001/options";

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
