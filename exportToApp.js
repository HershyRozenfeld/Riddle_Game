// Classes
export { default as Player } from './classes/Player.js';
export { default as RiddleManager } from './classes/RiddleManager.js';
export { default as UIManager } from './classes/UIManager.js';

// Riddles
export { default as allRiddles } from './riddles/exportRiddles.js';

// Utils
export { getSumAndAverage, divMinutesAndSeconds } from './utils/timeUtils.js';
export { askLevel } from './utils/gameUtils.js';

// External dependencies
export { default as readlineSync } from 'readline-sync';