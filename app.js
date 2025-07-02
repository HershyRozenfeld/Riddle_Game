import { 
    RiddleGame,
    readlineSync, 
    allRiddles, 
    Player, 
    RiddleManager, 
    getSumAndAverage, 
    divMinutesAndSeconds, 
    UIManager,
    askLevel
} from './utils/exportToApp.js';



// Start the game
const game = new RiddleGame();
game.start();