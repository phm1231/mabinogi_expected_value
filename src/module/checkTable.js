function checkTable(table, rank, item, race){
    const RANK = rank.normalize("NFC");
    const ITEM = item.normalize("NFC");
    const RACE = race.normalize("NFC");

    if(   
        table.hasOwnProperty(RANK) &&
        table[RANK].hasOwnProperty(ITEM) &&
        table[RANK][ITEM].hasOwnProperty(RACE) &&
        Object.keys(table[RANK][ITEM][RACE]).length > 0
    )
        return true;
    else
        return false;
}

export default checkTable;