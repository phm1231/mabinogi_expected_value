function makeOption(values){
    const ret = [];
    
    values.map((item)=>{
        if(typeof(item) === "string") item = item.normalize("NFC");
        ret.push({value: item, label: item});
    })
    return ret;
}

export default makeOption;