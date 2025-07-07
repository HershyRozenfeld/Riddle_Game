// Classes
export { default as Player } from "../models/Player.js";
export { default as RiddleManager } from "../models/RiddleManager.js";
export { default as UIManager } from "../models/UIManager.js";
export { RiddleGame } from "../models/manageGame.js";

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
