import React from "react";
import ResultContent from "./resultContent";

function resultTable(props){
    const probs = props.probs;
    const counts = props.counts;
    const keys = Object.keys(probs);

    return(
        <div className="resultTable">
            <div className="resultTableRow">
                <ResultContent name={keys[0]} prob={probs[keys[0]]} count={counts[keys[0]]}></ResultContent>
                <ResultContent name={keys[1]} prob={probs[keys[1]]} count={counts[keys[1]]}></ResultContent>
            </div>
            <div className="resultTableRow">
                <ResultContent name={keys[2]} prob={probs[keys[2]]} count={counts[keys[2]]}></ResultContent>
                <ResultContent name={keys[3]} prob={probs[keys[3]]} count={counts[keys[3]]}></ResultContent>
            </div>
            <div className="resultTableRow">
                <ResultContent name={keys[4]} prob={probs[keys[4]]} count={counts[keys[4]]}></ResultContent>
                <ResultContent name={keys[5]} prob={probs[keys[5]]} count={counts[keys[5]]}></ResultContent>
            </div>
        </div>
    )
}

export default resultTable;