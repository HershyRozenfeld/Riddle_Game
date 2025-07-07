// Classes
export { default as Player } from "../classes/Player.js";
export { default as RiddleManager } from "../classes/RiddleManager.js";
export { default as UIManager } from "../classes/UIManager.js";
export { RiddleGame } from "../classes/manageGame.js";

// CRUD operations
export { 
    getRiddles, 
    setRiddles, 
    updateRiddle, 
    deleteRiddle, 
    getRiddlesByLevel 
} from "./crudUtils.js";

// Player management
export { 
    findPlayer, 
    createPlayer, 
    updatePlayer, 
    filterUnsolvedRiddles, 
    addSolvedRiddle, 
    identifyOrCreatePlayer, 
    showPlayerStats 
} from "./playersManager.js";

// Utility functions
export { getSumAndAverage, divMinutesAndSeconds } from "./timeUtils.js";
export { askLevel } from "./gameUtils.js";

// External dependencies
export { default as readlineSync } from "readline-sync";
