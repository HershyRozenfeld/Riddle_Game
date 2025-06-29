import { readlineSync, allRiddles, Player, RiddleManager, getSumAndAverage, divMinutesAndSeconds} from './exportToApp.js';

const pl = new Player();

function askLevel(){
    const level = readlineSync.question('What level you Whant? (Easy(1) Medium(2) Hard(3))');
    let num1, num2;
    switch(level){
        case '1':
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            break;
        case '2':
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 90) + 10;
            break;
        case '3':
            num1 = Math.floor(Math.random() * 900) + 100;
            num2 = Math.floor(Math.random() * 900) + 100;
            break;
        default:
            console.log("Invalid level, defaulting to Easy.");
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            break;
    }
    return {num1, num2};
}


function askRiddles(RiddlesArray, num1, num2){
    let time = [];
    for (let i = 0; i < RiddlesArray.length; i ++){
        const riddleObj = RiddlesArray[i];
        const taskDescription = riddleObj.getTaskDescription(num1, num2);
        const correctAnswer = riddleObj.getCorrectAnswer(num1, num2);
        const riddle = new RiddleManager(riddleObj.id, riddleObj.name, taskDescription, correctAnswer);
        time.push(riddle.askManager())
    }
    return time;
}


const {num1, num2} = askLevel()
const times = askRiddles(allRiddles, num1, num2);
const {sum, avg} = getSumAndAverage(times)

console.log(`Average time taken to solve a riddle ${divMinutesAndSeconds(avg)}`);
console.log(`Total time of solving riddles ${divMinutesAndSeconds(sum)}`);

