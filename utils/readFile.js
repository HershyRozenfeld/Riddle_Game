import { readFile } from 'node:fs/promises'

export default async function fileReader(path= "../riddles/riddles.txt", level = "Easy"){
    try{
        const data = await readFile(path, 'utf8');
        const jsonData = JSON.parse(data);
        console.log(jsonData[level])
        return jsonData[level];
    } catch(err){
        console.error(err);
    }
}

