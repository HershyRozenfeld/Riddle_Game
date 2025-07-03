// Classes
export { default as Player } from "../classes/Player.js";
export { default as RiddleManager } from "../classes/RiddleManager.js";
export { default as UIManager } from "../classes/UIManager.js";
export { RiddleGame } from "../classes/manageGame.js";

// Riddles
export { default as allRiddles } from "../riddles/riddles.txt";

// Utils
export { getSumAndAverage, divMinutesAndSeconds } from "./timeUtils.js";
export { askLevel } from "./gameUtils.js";

// External dependencies
export { default as readlineSync } from "readline-sync";
