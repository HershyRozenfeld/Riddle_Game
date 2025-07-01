import { 
    readlineSync, 
    allRiddles, 
    Player, 
    RiddleManager, 
    getSumAndAverage, 
    divMinutesAndSeconds, 
    UIManager,
    askLevel
} from './exportToApp.js';

/**
 * Main Game Class
 */
class RiddleGame {
    constructor() {
        this.ui = new UIManager();
        this.player = null;
    }

    /**
     * Asks riddles and measures time
     * @param {Array} riddlesArray - Array of riddle objects
     * @param {number} num1 - First number
     * @param {number} num2 - Second number
     * @returns {Array} Array of times
     */
    askRiddles(riddlesArray, num1, num2) {
        let times = [];
        for (let i = 0; i < riddlesArray.length; i++) {
            const riddleObj = riddlesArray[i];
            const taskDescription = riddleObj.getTaskDescription(num1, num2);
            const correctAnswer = riddleObj.getCorrectAnswer(num1, num2);
            const riddle = new RiddleManager(riddleObj.id, riddleObj.name, taskDescription, correctAnswer);
            times.push(riddle.askManager());
        }
        return times;
    }

    /**
     * Runs a single game round
     */
    playRound() {
        const { num1, num2 } = askLevel();
        const times = this.askRiddles(allRiddles, num1, num2);
        const { sum, avg } = getSumAndAverage(times);
        
        console.log(`Average time taken to solve a riddle ${divMinutesAndSeconds(avg)}`);
        console.log(`Total time of solving riddles ${divMinutesAndSeconds(sum)}`);
    }

    /**
     * Main game loop
     */
    start() {
        this.ui.showWelcome();
        this.player = new Player();
        
        do {
            this.playRound();
        } while (this.ui.askPlayAgain());
    }
}

// Start the game
const game = new RiddleGame();
game.start();