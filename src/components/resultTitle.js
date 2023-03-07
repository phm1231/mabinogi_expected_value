import React from "react";

function resultTitle(props){
    const options = props.options;
    const levels = props.levels;
 
    return(
        <div className="resultTitle">
            {
                options.map((item, i)=>(
                    <p key={i} className="resultTitleContent">{options[i]} {levels[i]} 레벨 이상</p>
                ))
            }
        </div>
    )
}

export default resultTitle;