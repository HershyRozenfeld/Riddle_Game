import readlineSync from 'readline-sync';
import
function createRiddle(){
    const level = readlineSync.question('What level you Want? (Easy(1) Medium(2) Hard(3)): ');
    const riddleJson = readlineSync.question(`Enter riddle JSON (e.g., {"id": 1, "name": "Easy Math 1", "TaskDescription":"What is 45 + 4?", "CorrectAnswer": 49 })`)
    const data = fileReader(Path ,level)
    // באמצע עבודה!!!
}