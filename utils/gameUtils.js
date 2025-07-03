import readlineSync from 'readline-sync';

/**
 * Prompts the user to select a difficulty level and generates two random numbers
 * @returns {Object} Object containing num1 and num2
 */
export function askLevel() {
    const level = readlineSync.question('What level you Want? (Easy(1) Medium(2) Hard(3)): ');
    
    switch(level) {
        case '1':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        default:
            console.log("Invalid level, defaulting to Easy.");
            return 1;
    }
}