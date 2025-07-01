import readlineSync from 'readline-sync';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import cliProgress from 'cli-progress';
import { Formatter } from '../utils/Formatter.js';

export class UIManager {
    constructor() {
        this.gradient = gradient(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']);
        this.progressBar = null;
    }

    async showWelcome() {
        console.clear();

        const title = figlet.textSync('Math Riddles', {
            font: 'Big',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        });

        console.log(this.gradient(title));
        console.log(chalk.cyan.bold('\n🎯 Welcome to the Advanced Math Riddles Game! 🎯\n'));

        console.log(chalk.yellow('🌟 What\'s new:'));
        console.log(chalk.white('   • Advanced scoring system'));
        console.log(chalk.white('   • Achievements and rewards'));
        console.log(chalk.white('   • Detailed statistics'));
        console.log(chalk.white('   • Improved user experience'));
        console.log(chalk.white('   • Multiple game modes\n'));

        this.pause();
    }

    async askPlayerName() {
        console.log(chalk.magenta.bold('🎮 Let\'s get to know you!'));
        const name = readlineSync.question(chalk.cyan('What\'s your name? '));

        if (!name.trim()) {
            console.log(chalk.red('Please enter a valid name.'));
            return this.askPlayerName();
        }

        console.log(chalk.green(`\n🎉 Nice to meet you, ${name}!\n`));
        return name.trim();
    }

    async showWelcomeBack(player) {
        console.log(chalk.blue.bold(`\n🔄 Welcome back, ${player.name}!`));
        console.log(chalk.white(`📊 Your Game Summary:`));
        console.log(chalk.white(`   • Games played: ${player.totalGames}`));
        console.log(chalk.white(`   • Average time: ${Formatter.formatTime(player.getAverageTime())}`));
        console.log(chalk.white(`   • Accuracy: ${player.getAccuracy().toFixed(1)}%`));
        console.log(chalk.white(`   • Achievements: ${player.achievements.length}\n`));

        this.pause();
    }

    async askDifficulty() {
        console.log(chalk.yellow.bold('🎯 Choose difficulty:'));
        console.log(chalk.green('1. 🟢 Easy (numbers 1-10)'));
        console.log(chalk.yellow('2. 🟡 Medium (numbers 10-100)'));
        console.log(chalk.red('3. 🔴 Hard (numbers 100-1000)'));
        console.log(chalk.magenta('4. 🌟 Challenge (random numbers)'));

        const choice = readlineSync.question(chalk.cyan('\nYour choice (1-4): '));

        const difficultyMap = {
            '1': 'easy',
            '2': 'medium',
            '3': 'hard',
            '4': 'challenge'
        };

        if (!difficultyMap[choice]) {
            console.log(chalk.red('Invalid choice, defaulting to Easy mode.'));
            return 'easy';
        }

        return difficultyMap[choice];
    }

    async askGameMode() {
        console.log(chalk.blue.bold('\n🎲 Choose game mode:'));
        console.log(chalk.cyan('1. ⚡ Quick (5 riddles)'));
        console.log(chalk.blue('2. 🎯 Normal (10 riddles)'));
        console.log(chalk.green('3. 🏆 Marathon (20 riddles)'));
        console.log(chalk.red('4. 🔥 Extreme Challenge (50 riddles)'));

        const choice = readlineSync.question(chalk.cyan('\nYour choice (1-4): '));

        const modeMap = {
            '1': 'quick',
            '2': 'normal',
            '3': 'marathon',
            '4': 'extreme'
        };

        if (!modeMap[choice]) {
            console.log(chalk.red('Invalid choice, defaulting to Normal mode.'));
            return 'normal';
        }

        return modeMap[choice];
    }

    async showRoundStart(difficulty, gameMode, riddleCount) {
        console.clear();
        console.log(chalk.green.bold('\n🚀 Starting a new round!\n'));

        const difficultyNames = {
            easy: '🟢 Easy',
            medium: '🟡 Medium',
            hard: '🔴 Hard',
            challenge: '🌟 Challenge'
        };

        const modeNames = {
            quick: '⚡ Quick',
            normal: '🎯 Normal',
            marathon: '🏆 Marathon',
            extreme: '🔥 Extreme Challenge'
        };

        console.log(chalk.white(`📊 Round Details:`));
        console.log(chalk.white(`   • Difficulty: ${difficultyNames[difficulty]}`));
        console.log(chalk.white(`   • Game Mode: ${modeNames[gameMode]}`));
        console.log(chalk.white(`   • Riddle Count: ${riddleCount}\n`));

        console.log(chalk.yellow('💡 Tip: Type "hint" to get help during a riddle\n'));

        this.pause('Press Enter to begin...');
    }

    async showProgress(current, total) {
        if (!this.progressBar) {
            this.progressBar = new cliProgress.SingleBar({
                format: chalk.cyan('Progress |') + chalk.green('{bar}') + chalk.cyan('| {percentage}% | {value}/{total} riddles'),
                barCompleteChar: '█',
                barIncompleteChar: '░',
                hideCursor: true
            });
            this.progressBar.start(total, 0);
        }

        this.progressBar.update(current);

        if (current === total) {
            this.progressBar.stop();
            this.progressBar = null;
        }
    }

    async showRiddleStart(riddle, riddleNumber) {
        console.log(chalk.blue.bold(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
        console.log(chalk.cyan.bold(`🧩 Riddle #${riddleNumber}`));
        console.log(chalk.blue.bold(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`));
    }

    async askRiddle(riddle, attempts) {
        let prompt = chalk.yellow.bold(`❓ ${riddle.description}`);

        if (attempts > 1) {
            prompt += chalk.red(` (Attempt ${attempts})`);
        }

        const answer = readlineSync.question(`${prompt}\n${chalk.cyan('Your answer')}: `);

        if (answer.toLowerCase().includes('hint')) {
            return null;
        }

        return answer.trim();
    }

    async showHint(riddle) {
        console.log(chalk.magenta.bold('\n💡 Hint:'));
        console.log(chalk.white(`   ${riddle.hint}\n`));
    }

    async showWrongAnswer(attempts) {
        const messages = [
            '❌ Incorrect, try again!',
            '🤔 Close... but not quite.',
            '💪 Don’t give up! Try again.',
            '🎯 Wait, check your math.',
            '⚡ Almost! One more shot.'
        ];

        const messageIndex = Math.min(attempts - 1, messages.length - 1);
        console.log(chalk.red.bold(`\n${messages[messageIndex]}\n`));
    }

    async showRiddleResult(result) {
        console.log(chalk.green.bold('\n✅ Correct answer!'));

        console.log(chalk.white(`⏱️  Time: ${Formatter.formatTime(result.duration)}`));
        console.log(chalk.white(`🎯 Attempts: ${result.attempts}`));

        if (result.duration <= 3 && result.attempts === 1) {
            console.log(chalk.yellow.bold('🌟 Amazing! That was lightning fast!'));
        } else if (result.attempts === 1) {
            console.log(chalk.green.bold('👏 Great job! Solved on the first try!'));
        } else if (result.duration <= 10) {
            console.log(chalk.blue.bold('⚡ Nice! You kept a good pace!'));
        }

        console.log(chalk.blue('─'.repeat(40)));
    }

    async showBreak() {
        await this.sleep(1000);
    }

    async showRoundSummary(session) {
        console.clear();
        console.log(chalk.green.bold('\n🎉 Round Complete! 🎉\n'));

        console.log(chalk.blue.bold('📊 Performance Summary:'));
        console.log(chalk.blue('═'.repeat(50)));

        console.log(chalk.white(`📝 Riddles solved: ${session.results.length}`));
        console.log(chalk.white(`⏱️  Total time: ${Formatter.formatTime(session.getTotalTime())}`));
        console.log(chalk.white(`⚡ Avg time: ${Formatter.formatTime(session.getAverageTime())}`));
        console.log(chalk.white(`🎯 Accuracy: ${session.getAccuracy().toFixed(1)}%`));
        console.log(chalk.white(`🏃 Fastest: ${Formatter.formatTime(session.getBestTime())}`));
        console.log(chalk.white(`🐌 Slowest: ${Formatter.formatTime(session.getWorstTime())}`));
        console.log(chalk.white(`🔄 Total attempts: ${session.getTotalAttempts()}\n`));

        this.showPerformanceEvaluation(session);
        this.pause();
    }

    showPerformanceEvaluation(session) {
        const avgTime = session.getAverageTime();
        const accuracy = session.getAccuracy();

        console.log(chalk.yellow.bold('🎖️  Performance Evaluation:'));

        if (accuracy === 100 && avgTime <= 5) {
            console.log(chalk.yellowBright('👑 Perfect performance! You\'re a math genius!'));
        } else if (accuracy >= 90 && avgTime <= 10) {
            console.log(chalk.green('🌟 Excellent! You\'re on the right track!'));
        } else if (accuracy >= 80) {
            console.log(chalk.blue('👍 Good job! A little room for improvement.'));
        } else if (accuracy >= 60) {
            console.log(chalk.yellow('💪 Not bad! Keep practicing and you\'ll improve.'));
        } else {
            console.log(chalk.red('🎯 Lots of room to improve. Don’t give up – practice makes perfect!'));
        }

        console.log();
    }

    async showAchievements(achievements) {
        console.log(chalk.rainbow.bold('\n🏆 New Achievements! 🏆\n'));

        achievements.forEach(achievement => {
            console.log(chalk.yellow(`🎖️  ${achievement.name}`));
            console.log(chalk.white(`   ${achievement.description}\n`));
        });

        this.pause();
    }

    async askPlayAgain() {
        console.log(chalk.cyan.bold('🔄 Want to play another round?'));
        const answer = readlineSync.question(chalk.white('Yes (y) or No (n): '));

        const yes = ['y', 'yes', '1'];
        return yes.includes(answer.toLowerCase());
    }

    async showFarewell(player) {
        console.clear();
        console.log(chalk.rainbow(figlet.textSync('Goodbye!', { font: 'Small' })));

        console.log(chalk.green.bold(`\n🎮 Thanks for playing, ${player.name}!\n`));

        console.log(chalk.blue.bold('📈 Your Final Stats:'));
        console.log(chalk.blue('═'.repeat(40)));
        console.log(chalk.white(`🎯 Total games: ${player.totalGames}`));
        console.log(chalk.white(`⏱️  Avg time: ${Formatter.formatTime(player.getAverageTime())}`));
        console.log(chalk.white(`🎖️  Overall accuracy: ${player.getAccuracy().toFixed(1)}%`));
        console.log(chalk.white(`⚡ Personal best: ${Formatter.formatTime(player.bestTime)}`));
        console.log(chalk.white(`🏆 Achievements: ${player.achievements.length}\n`));

        console.log(chalk.magenta('🌟 See you next time for more brain-teasing fun! 🌟\n'));
    }

    async showError(message) {
        console.log(chalk.red.bold(`\n❌ Error: ${message}\n`));
    }

    pause(message = 'Press Enter to continue...') {
        readlineSync.question(chalk.gray(message));
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
