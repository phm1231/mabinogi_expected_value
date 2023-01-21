function makeOption(values){
    const ret = [];
    
    values.map((item)=>{
        ret.push({value: item, label: item});
    })
    return ret;
}

export default makeOption;