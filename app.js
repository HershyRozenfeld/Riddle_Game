import { readlineSync, allRiddles, Player, RiddleManager, getSumAndAverage, divMinutesAndSeconds} from './exportToApp.js';

const pl = new Player();

function askRiddles(RiddlesArray, num1, num2){
    let time = [];
    for (let i = 0; i < RiddlesArray.length; i ++){
        const riddle = new RiddleManager(RiddlesArray[i].id, RiddlesArray[i].name, RiddlesArray[i].taskDescription, RiddlesArray[i].correctAnswer);
        RiddlesArray[i].num1 = num1;
        RiddlesArray[i].num2 = num2;
        time.push(riddle.askManager())
    }
    return time;
}

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

let num1, num2 = askLevel()
const times = askRiddles(allRiddles);
const {sum, avg} = getSumAndAverage(times)

console.log(`Average time taken to solve a riddle ${divMinutesAndSeconds(avg)}`);
console.log(`Total time of solving riddles ${divMinutesAndSeconds(sum)}`);

