function hasDuplicate(arr){
    const uniqueSet = new Set(arr);
    return uniqueSet.size !== arr.length;
}

export default hasDuplicate;