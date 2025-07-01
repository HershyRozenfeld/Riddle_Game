import readlineSync from 'readline-sync';

/**
 * Prompts the user to select a difficulty level and generates two random numbers
 * @returns {Object} Object containing num1 and num2
 */
export function askLevel() {
    const level = readlineSync.question('What level you Want? (Easy(1) Medium(2) Hard(3)): ');
    let num1, num2;
    
    switch(level) {
        case '1':
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            break;
        case '2':
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 90) + 10;
            break;
        case '3':
            num1 = Math.floor(Math.random() * 900) + 100;
            num2 = Math.floor(Math.random() * 900) + 100;
            break;
        default:
            console.log("Invalid level, defaulting to Easy.");
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            break;
    }
    return { num1, num2 };
}