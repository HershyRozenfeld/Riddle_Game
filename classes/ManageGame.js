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

import { 
    filterUnsolvedRiddles, 
    addSolvedRiddle, 
    updatePlayer 
} from '../utils/playersManager.js';
import { 
    showPlayerStats 
} from '../utils/playersManager.js';

/**
 * Main game class
 */
export class RiddleGame {
    constructor() {
        this.ui = new UIManager();
        this.player = null;
        this.currentPlayerData = null;
    }

    /**
     * Asks riddles and measures time
     * @param {Array} riddlesArray - Array of riddle objects
     * @param {string} level - Difficulty level
     * @returns {Array} Array of times
     */
    askRiddles(riddlesArray, level) {
        let times = [];
        
        for (let i = 0; i < riddlesArray.length; i++) {
            const riddleObj = riddlesArray[i];
            const riddle = new RiddleManager(
                riddleObj.id, 
                riddleObj.name, 
                riddleObj.TaskDescription, 
                riddleObj.CorrectAnswer
            );
            
            const timeSeconds = riddle.askManager();
            times.push(timeSeconds);
            
            // Add solved riddle to player data
            addSolvedRiddle(this.currentPlayerData, riddleObj, timeSeconds, level);
        }
        
        return times;
    }

    /**
     * Runs a single game round
     */
    async playRound() {
        const level = askLevel();
        const levelNames = { 1: "Easy", 2: "Medium", 3: "Hard" };
        const selectedLevel = levelNames[level];

        try {
            // Load riddles by level
            const allRiddles = await getRiddlesByLevel(selectedLevel);

            if (allRiddles.length === 0) {
                console.log("No riddles available at this level!");
                return;
            }

            // Filter unsolved riddles
            const unsolvedRiddles = filterUnsolvedRiddles(allRiddles, this.currentPlayerData);

            if (unsolvedRiddles.length === 0) {
                console.log(`Well done! You've already solved all riddles at ${selectedLevel} level! 🎉`);
                console.log("Try a different level or wait for new riddles.");
                return;
            }

            console.log(`${unsolvedRiddles.length} new riddles found for you at ${selectedLevel} level`);

            const times = this.askRiddles(unsolvedRiddles, selectedLevel);
            const { sum, avg } = getSumAndAverage(times);

            console.log(`Average time per riddle: ${divMinutesAndSeconds(avg)}`);
            console.log(`Total time to solve riddles: ${divMinutesAndSeconds(sum)}`);

            // Save updated player data
            await updatePlayer(this.currentPlayerData);
            
        } catch (err) {
            console.error("Error loading riddles:", err);
        }
    }

    /**
     * CRUD Manager - riddle operations
     */
    async crudManager() {
        let flag = true;
        do {
            console.log("\nWould you like to view, add, update, or delete riddles?");
            const answer = readlineSync.question('Yes (y) or No (n): ');
            const yes = ['y', 'yes', '1', 'כן'];
            flag = yes.includes(answer.toLowerCase());
            
            if (flag) {
                await this.selectCrudAction();
            }
        } while(flag);
    }
    
    /**
     * Choose a CRUD action
     */
    async selectCrudAction() {
        const answerCrud = readlineSync.question("What would you like to do: (View(1), Add(2), Update(3), Delete(4)) ");
        
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
                console.log("Your answer doesn't match any action.");
                break;
        }
    }

    /**
     * Main game loop
     */
    async start() {
        this.ui.showWelcome();
        
        // Player identification
        this.player = new Player();
        this.currentPlayerData = await this.player.identify();
        
        do {
            await this.playRound();
        } while (this.ui.askPlayAgain());
        
        // Show stats before exit
        this.player.showStats();
        
        // After game ends, ask if they want to manage riddles
        await this.crudManager();
    }
}
