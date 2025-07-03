import { 
    readlineSync, 
    Player, 
    RiddleManager, 
    getSumAndAverage, 
    divMinutesAndSeconds, 
    UIManager,
    askLevel
} from '../utils/exportToApp.js';

import { 
    getRiddles, 
    setRiddles, 
    updateRiddle, 
    deleteRiddle, 
    getRiddlesByLevel 
} from '../utils/crudUtils.js';

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
     * @returns {Array} Array of times
     */
    askRiddles(riddlesArray) {
        let times = [];
        for (let i = 0; i < riddlesArray.length; i++) {
            const riddleObj = riddlesArray[i];
            const riddle = new RiddleManager(
                riddleObj.id, 
                riddleObj.name, 
                riddleObj.TaskDescription, 
                riddleObj.CorrectAnswer
            );
            times.push(riddle.askManager());
        }
        return times;
    }

    /**
     * Runs a single game round
     */
    async playRound() {
        const level = askLevel();
        const levelNames = { 1: "Easy", 2: "Medium", 3: "Hard" };
        
        try {
            const riddlesArray = await getRiddlesByLevel(levelNames[level]);
            
            if (riddlesArray.length === 0) {
                console.log("אין חידות זמינות ברמה זו!");
                return;
            }
            
            const times = this.askRiddles(riddlesArray);
            const { sum, avg } = getSumAndAverage(times);
            
            console.log(`Average time taken to solve a riddle ${divMinutesAndSeconds(avg)}`);
            console.log(`Total time of solving riddles ${divMinutesAndSeconds(sum)}`);
            
        } catch (err) {
            console.error("שגיאה בטעינת החידות:", err);
        }
    }

    /**
     * CRUD Manager - manages riddle operations
     */
    async crudManager() {
        let flag = true;
        do {
            console.log("\nDo you want to view, add, update, or delete riddles? ");
            const answer = readlineSync.question('Yes (y) or No (n): ');
            const yes = ['y', 'yes', '1'];
            flag = yes.includes(answer.toLowerCase());
            
            if (flag) {
                await this.selectCrudAction();
            }
        } while(flag);
    }
    
    /**
     * Selects CRUD action
     */
    async selectCrudAction() {
        const answerCrud = readlineSync.question("What do you want to do: (View(1), Add(2), Update(3), Delete(4)) ");
        
        switch(answerCrud) {
            case '1':
                await getRiddles();
                break;
            case '2':
                await setRiddles();
                break;
            case '3':
                await updateRiddle();
                break;
            case '4':
                await deleteRiddle();
                break;
            default:
                console.log("Your answer does not match any action.");
                break;
        }
    }

    /**
     * Main game loop
     */
    async start() {
        this.ui.showWelcome();
        this.player = new Player();
        
        do {
            await this.playRound();
        } while (this.ui.askPlayAgain());
        
        // לאחר סיום המשחק - שואל אם רוצה לנהל חידות
        await this.crudManager();
    }
}