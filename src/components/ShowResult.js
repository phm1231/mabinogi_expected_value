import React from 'react';
import './component.css';
import ResultTitle from "./ResultTitle";
import ResultTable from "./ResultTable";

function ShowResult(props){

    const Info = props.Info;        
    // option 중복 검사 추가 요망.
    if(!props.isOpen){
      return null;
    }

    return (      
      <div>
        <div className='blackBackground'/>
        <div className="Modal">
          <ResultTitle Info={Info}></ResultTitle>
          <ResultTable Info={Info}></ResultTable>
          <div className="wrapperBtn">
            <button className="w-btn w-btn-indigo" type="button" onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
};

export default ShowResult;
