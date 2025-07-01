export class Riddle {
    constructor(id, type, description, answer, difficulty = 'easy') {
        this.id = id;
        this.type = type;
        this.description = description;
        this.correctAnswer = answer;
        this.difficulty = difficulty;
        this.hint = this.generateHint();
    }

    checkAnswer(userAnswer) {
        const numericAnswer = parseFloat(userAnswer);
        const correctNumeric = parseFloat(this.correctAnswer);
        
        // טיפול במספרים עשרוניים
        if (this.type === 'division') {
            return Math.abs(numericAnswer - correctNumeric) < 0.01;
        }
        
        return numericAnswer === correctNumeric;
    }

    generateHint() {
        switch (this.type) {
            case 'addition':
                return 'Hint: Try adding the numbers together';
            case 'subtraction':
                return 'Hint: Try subtracting the smaller number from the bigger one';
            case 'multiplication':
                return 'Hint: Try multiplying the numbers';
            case 'division':
                return 'Hint: Try dividing the first number by the second';
            default:
                return 'Hint: Calculate step by step';
        }
    }


    getFormattedAnswer() {
        if (this.type === 'division' && this.correctAnswer % 1 !== 0) {
            return parseFloat(this.correctAnswer).toFixed(2);
        }
        return this.correctAnswer.toString();
    }
}
