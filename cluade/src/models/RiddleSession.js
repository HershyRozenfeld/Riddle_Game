export class RiddleSession {
    constructor(player, difficulty, gameMode) {
        this.player = player;
        this.difficulty = difficulty;
        this.gameMode = gameMode;
        this.startTime = Date.now();
        this.endTime = null;
        this.results = [];
    }

    addResult(result) {
        this.results.push(result);
    }

    finish() {
        this.endTime = Date.now();
    }

    getTotalTime() {
        return this.results.reduce((sum, result) => sum + result.duration, 0);
    }

    getAverageTime() {
        return this.results.length > 0 ? this.getTotalTime() / this.results.length : 0;
    }

    getBestTime() {
        return this.results.length > 0 ? Math.min(...this.results.map(r => r.duration)) : Infinity;
    }

    getWorstTime() {
        return this.results.length > 0 ? Math.max(...this.results.map(r => r.duration)) : 0;
    }

    getCorrectAnswers() {
        return this.results.filter(r => r.isCorrect).length;
    }

    getAccuracy() {
        return this.results.length > 0 ? (this.getCorrectAnswers() / this.results.length) * 100 : 0;
    }

    getTotalAttempts() {
        return this.results.reduce((sum, result) => sum + result.attempts, 0);
    }
}
