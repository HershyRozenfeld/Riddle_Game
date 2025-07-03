import { 
    readlineSync, 
    getAllRiddles, 
    Player, 
    RiddleManager, 
    getSumAndAverage, 
    divMinutesAndSeconds, 
    UIManager,
    askLevel
} from '../utils/exportToApp.js';


/**
 * Main Game Class
 */
export class RiddleGame {
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
    askRiddles(riddlesArray) {
        let times = [];
        for (let i = 0; i < riddlesArray.length; i++) {
            const riddleObj = riddlesArray[i];
            const riddle = new RiddleManager(riddleObj.id, riddleObj.name, riddleObj.taskDescription, riddleObj.correctAnswer);
            times.push(riddle.askManager());
        }
        return times;
    }

    /**
     * Runs a single game round
     */
    playRound() {
        const lavel = askLevel();
        const times = getAllRiddles().then(res => this.askRiddles(res));
        const { sum, avg } = getSumAndAverage(times);
        
        console.log(`Average time taken to solve a riddle ${divMinutesAndSeconds(avg)}`);
        console.log(`Total time of solving riddles ${divMinutesAndSeconds(sum)}`);
    }

    crudManager(){
        let flag = true;
        do {
            console.log("Do you want to view, add, update, or delete riddles? ");
            const answer = readlineSync.question('Yes (y) or No (n): ');
            const yes = ['y', 'yes', '1'];
            flag = yes.includes(answer.toLowerCase());
            if (flag){
                selectCrudAction();
            }
        } while(flag);
    }
    
    selectCrudAction(){
        const answerCrud = readlineSync.question("What do you want to do: (View(1), Add(2), Update(3), Delete(4))");
        switch(answerCrud){
            case 1:
                getRiddles();
                return;
            case 2:
                setRiddles();
                return;
            case 3:
                updateRiddle();
                return;
            case 4:
                deleteReddle();
                return;
            default:
                console.log("Your answer does not match any action.")
                return;
        }
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