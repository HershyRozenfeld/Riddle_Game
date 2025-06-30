import { readlineSync, allRiddles, Player, RiddleManager, getSumAndAverage, divMinutesAndSeconds, UIManager} from './exportToApp.js';

const UI = new UIManager;
UI.showWelcome();
const pl = new Player();

/**
 * Prompts the user to select a difficulty level and generates two random numbers according to the chosen level.
 * @returns {Object} An object containing two numbers: num1 and num2.
 */
function askLevel(){
    const level = readlineSync.question('What level you Whant? (Easy(1) Medium(2) Hard(3)): ');
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

/**
 * Asks the user to solve each riddle in the given array, using the provided numbers as parameters for the riddles.
 * Measures the time taken for each riddle.
 * @param {Array} RiddlesArray - Array of riddle objects to be presented to the user.
 * @param {number} num1 - First number, used in the riddles.
 * @param {number} num2 - Second number, used in the riddles.
 * @returns {Array} Array of times taken to answer each riddle.
 */
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

/**
 * Runs the main game loop: asks for the level, presents the riddles, calculates and displays total and average solving times,
 * and asks the user if they want to play again.
 * No parameters.
 */
function startAndEndGame(){
    const {num1, num2} = askLevel()
    const times = askRiddles(allRiddles, num1, num2);
    const {sum, avg} = getSumAndAverage(times)
    console.log(`Average time taken to solve a riddle ${divMinutesAndSeconds(avg)}`);
    console.log(`Total time of solving riddles ${divMinutesAndSeconds(sum)}`);
    (UI.askPlayAgain()) ? startAndEndGame() : null;
}

startAndEndGame()
