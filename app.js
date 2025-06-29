import { readlineSync, allRiddles, Player, RiddleManager} from './exportToApp.js';

const pl = new Player();

function askRiddles(RiddlesArray){
    let time = [];
    for (let i = 0; i < RiddlesArray.length; i ++){
        const riddle = new RiddleManager(RiddlesArray[i].id, RiddlesArray[i].name, RiddlesArray[i].taskDescription, RiddlesArray[i].correctAnswer)
        time.push(riddle.askManager())
    }
    return time;
}

function getSumAndAverage(arr){
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = arr.length ? sum / arr.length : 0;
    return {sum, avg}
}

function divisionMinutesAndSeconds(num){
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
}
        

const times = askRiddles(allRiddles);
const {sum, avg} = getSumAndAverage(times)

console.log(`Average time taken to solve a riddle ${divisionMinutesAndSeconds(avg)}`);
console.log(`Total time of solving riddles ${divisionMinutesAndSeconds(sum)}`);

