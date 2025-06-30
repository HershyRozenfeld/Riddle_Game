import readlineSync from 'readline-sync';
import allRiddles from './riddles/exportRiddles.js';
import Player from './classes/Player.js';
import RiddleManager from './classes/RiddleManager.js';
import figlet from 'figlet';
import chalk from 'chalk';

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

class UIManager {

    showWelcome() {
        console.clear();
        const colors = [chalk.red, chalk.yellow, chalk.green, chalk.cyan, chalk.blue, chalk.magenta];

        const title = figlet.textSync('Math Riddles', {
            font: 'Big',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        });

        const coloredLines = title.split('\n').map((line, i) => colors[i % colors.length].bold(line)).join('\n');
        console.log(coloredLines);

        console.log(chalk.cyan.bold('\n🎯 Welcome to the Advanced Math Riddles Game! 🎯\n'));
    }

    async askPlayAgain() {
        console.log(chalk.cyan.bold('🔄 Want to play another round?'));
        const answer = readlineSync.question(chalk.white('Yes (y) or No (n): '));

        const yes = ['y', 'yes', '1'];
        return yes.includes(answer.toLowerCase());
    }
}

      
export {
    readlineSync,
    allRiddles,
    figlet,
    Player,
    RiddleManager,
    getSumAndAverage,
    divMinutesAndSeconds,
    UIManager
}