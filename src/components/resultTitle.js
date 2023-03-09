import React, {useEffect} from "react";
import { postOption } from "../module/callAPI";

function ResultTitle(props){
    const options = props.Info.options;
    const levels = props.Info.levels;
    const rank = props.Info.rank;
    const item = props.Info.item;
    const race = props.Info.race;

    useEffect(()=>{
        postOption(rank, item, race, options, levels);
    }, [])

    return(
        <div className="resultTitle">
            <p className="resultTitleContent">{rank} / {item} / {race}</p>
            {
                options.map((item, i)=>(
                    <p key={i} className="resultTitleContent">{options[i]} {levels[i]} 레벨 이상</p>
                ))
            }
        </div>
    )
}

export default ResultTitle;