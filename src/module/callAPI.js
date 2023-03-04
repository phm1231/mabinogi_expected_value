import axios from 'axios';

const req_url = "http://localhost:3001/probs/";

async function getTable(toolname, rank=undefined, item=undefined, race=undefined){
    const res = await axios.get(req_url + toolname,{
        params:{
            "rank": rank,
            "item": item,
            "race": race
        }
    });
    return res.data;
}

export default getTable;