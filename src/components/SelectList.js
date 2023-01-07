import React from "react";
import Select from "react-select";

// props must have <value, label>
function SelectList(props) {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      
    return(
        // props.뭐시기 로 수정.
        <Select options={options} />
    )
}
export default SelectList