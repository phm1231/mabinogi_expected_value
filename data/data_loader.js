const readline = require('readline');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// 1개의 Data File 읽기
function readDataFile(data_file){
    const lines = fs.readFileSync(data_file, 'binary').toString().split("\n");
    let prob = {}; // prob.option.level = value
    for (i in lines){
        const line = iconv.decode(lines[i], 'euc-kr').split("__");

        if(line.length === 0) continue;

        const option = line[0];
        const level = line[1];
        const prob_value = line[2];

        if(prob[option] === undefined) prob[option] = {};
        if(prob_value !== undefined) prob[option][level] = prob_value.split("%")[0];
    }
    return prob;
}

// 모든 Data File 읽기
function readAllDataFile(){
    const prob_dir = path.join(__dirname, "세공확률");
    let table = {};

    fs.readdirSync(prob_dir, {withFileTypes: true}).forEach(tool => {
        if(tool.isDirectory()){
            const tool_dir = path.join(prob_dir, tool.name);
            if(table[tool.name] === undefined) table[tool.name] = {};

            fs.readdirSync(tool_dir, {withFileTypes: true}).forEach(rank =>{
                if(rank.isDirectory()){
                const rank_dir = path.join(tool_dir, rank.name);
                if(table[tool.name][rank.name] === undefined) table[tool.name][rank.name] = {};

                fs.readdirSync(rank_dir, {withFileTypes: true}).forEach(item =>{
                    if(item.isDirectory()){
                    const item_dir = path.join(rank_dir, item.name);
                    if(table[tool.name][rank.name][item.name] === undefined) table[tool.name][rank.name][item.name] = {};

                    fs.readdirSync(item_dir, {withFileTypes: true}).forEach(race =>{
                        const data_file_path = path.join(item_dir, race.name);
                        table[tool.name][rank.name][item.name][race.name] = readDataFile(data_file_path)
                    })
                    }
                })
                }
            })
        }
    });

    return table;
}

function readTest(){
    var count = 0;
    for (tool in table){
        for(rank in table[tool]){
            for(item in table[tool][rank]){
                for(race in table[tool][rank][item]){
                    prob = table[tool][rank][item][race];
                    // printProb(prob);
                }
            }
        }
    }
}

function printProb(prob){

    for( option in prob){
        for (level in prob[option]){
            // console.log(option + ": " + level + " - " + prob[option][level]);
        }
    }

}

const table = readAllDataFile();

// readTest();
/*
    prob = table[tool][rank][item][race]
    prob_value = prob[option][level]
        level = 0이면 옵션 등장 확률
            아니면, 레벨별 등장 확률
*/

module.exports = table