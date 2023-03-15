import React from "react";
import ResultContent from "./ResultContent";
import {ToolnamesForAPI, Toolnames} from "../data/tools";

function ResultTable(props){
    const Info = props.Info;
    return(
        <div className="resultTable">
            <div className="resultTableRow">
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[0]} toolname={Toolnames[0]}></ResultContent>
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[1]} toolname={Toolnames[1]}></ResultContent>
            </div>
            <div className="resultTableRow">
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[2]} toolname={Toolnames[2]}></ResultContent>
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[3]} toolname={Toolnames[3]}></ResultContent>
            </div>
            <div className="resultTableRow">
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[4]} toolname={Toolnames[4]}></ResultContent>
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[5]} toolname={Toolnames[5]}></ResultContent>
            </div>
            <div className="resultTableRow">
                <ResultContent Info={Info} toolnameForAPI={ToolnamesForAPI[6]} toolname={Toolnames[6]}></ResultContent>
                <div className="resultTableCell"></div>
            </div>
        </div>
    )
}

export default ResultTable;