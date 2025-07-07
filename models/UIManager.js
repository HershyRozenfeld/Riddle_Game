import readlineSync from 'readline-sync';
import figlet from 'figlet';
import chalk from 'chalk';

export default class UIManager {
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

    askPlayAgain() {
        console.log(chalk.cyan.bold('🔄 Want to play another round?'));
        const answer = readlineSync.question(chalk.white('Yes (y) or No (n): '));

        const yes = ['y', 'yes', '1'];
        return yes.includes(answer.toLowerCase());
    }
}