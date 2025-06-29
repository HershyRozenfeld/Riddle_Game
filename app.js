import readlineSync from 'readline-sync';
import allRiddles from './riddles/exportRiddles.js';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';


const pl = new Player();

function askRiddles(RiddlesArray){
    for (let i = 0; i < RiddlesArray.length; i ++){
        const riddle = new Riddle(RiddlesArray[i].id, RiddlesArray[i].name, RiddlesArray[i].taskDescription, RiddlesArray[i].correctAnswer)
        riddle.ask()
    }
}

askRiddles(allRiddles);