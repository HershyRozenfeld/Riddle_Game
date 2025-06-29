import readlineSync from 'readline-sync';
import allRiddles from './riddles/exportRiddles.js';
import Player from './classes/Player.js';
import RiddleManager from './classes/RiddleManager.js';

function getSumAndAverage(arr){
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = arr.length ? sum / arr.length : 0;
    return {sum, avg}
}

function divMinutesAndSeconds(num){
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
}
        
export {
    readlineSync,
    allRiddles,
    Player,
    RiddleManager,
    getSumAndAverage,
    divMinutesAndSeconds
}