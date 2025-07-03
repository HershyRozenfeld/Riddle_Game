import { RiddleGame } from './utils/exportToApp.js';

// Start the game
const game = new RiddleGame();
game.start().catch(console.error);