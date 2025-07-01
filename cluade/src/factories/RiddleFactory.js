import { Riddle } from '../models/Riddle.js';
import { GameConfig } from '../config/GameConfig.js';

export class RiddleFactory {
    constructor() {
        this.riddleTypes = ['addition', 'subtraction', 'multiplication', 'division'];
        this.riddleCount = 0;
    }

    createRiddle(difficulty) {
        this.riddleCount++;
        const type = this.getRandomType();
        const { num1, num2 } = this.generateNumbers(difficulty, type);
        
        const description = this.generateDescription(type, num1, num2);
        const answer = this.calculateAnswer(type, num1, num2);
        
        return new Riddle(this.riddleCount, type, description, answer, difficulty);
    }

    getRandomType() {
        return this.riddleTypes[Math.floor(Math.random() * this.riddleTypes.length)];
    }

    generateNumbers(difficulty, type) {
        const config = GameConfig.difficulties[difficulty];
        let num1, num2;

        switch (difficulty) {
            case 'easy':
                num1 = Math.floor(Math.random() * config.maxNumber) + 1;
                num2 = Math.floor(Math.random() * config.maxNumber) + 1;
                break;
            case 'medium':
                num1 = Math.floor(Math.random() * config.maxNumber) + config.minNumber;
                num2 = Math.floor(Math.random() * config.maxNumber) + config.minNumber;
                break;
            case 'hard':
                num1 = Math.floor(Math.random() * config.maxNumber) + config.minNumber;
                num2 = Math.floor(Math.random() * config.maxNumber) + config.minNumber;
                break;
        }

        // התאמות מיוחדות לפי סוג הפעולה
        if (type === 'division') {
            // וידוא שהחלוקה תיתן תוצאה הגיונית
            num1 = num2 * Math.floor(Math.random() * 10 + 1);
        }
        
        if (type === 'subtraction' && num2 > num1) {
            [num1, num2] = [num2, num1]; // החלפה כדי למנוע תוצאה שלילית
        }

        return { num1, num2 };
    }

    generateDescription(type, num1, num2) {
    const operations = {
        addition: `What is ${num1} + ${num2}?`,
        subtraction: `What is ${num1} - ${num2}?`,
        multiplication: `What is ${num1} × ${num2}?`,
        division: `What is ${num1} ÷ ${num2}?`
    };

    return operations[type];
}


    calculateAnswer(type, num1, num2) {
        switch (type) {
            case 'addition':
                return num1 + num2;
            case 'subtraction':
                return num1 - num2;
            case 'multiplication':
                return num1 * num2;
            case 'division':
                return num1 / num2;
            default:
                throw new Error(`Unknown riddle type: ${type}`);
        }
    }
}