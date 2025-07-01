export class Player {
    constructor(name) {
        this.name = name;
        this.totalGames = 0;
        this.totalTime = 0;
        this.totalRiddles = 0;
        this.correctAnswers = 0;
        this.bestTime = Infinity;
        this.sessions = [];
        this.achievements = [];
        this.createdAt = new Date();
        this.lastPlayed = new Date();
    }

    addSession(session) {
        this.sessions.push(session);
        this.totalGames++;
        this.totalTime += session.getTotalTime();
        this.totalRiddles += session.results.length;
        this.correctAnswers += session.getCorrectAnswers();
        
        const sessionBestTime = session.getBestTime();
        if (sessionBestTime < this.bestTime) {
            this.bestTime = sessionBestTime;
        }
        
        this.lastPlayed = new Date();
    }

    getAverageTime() {
        return this.totalRiddles > 0 ? this.totalTime / this.totalRiddles : 0;
    }

    getAccuracy() {
        return this.totalRiddles > 0 ? (this.correctAnswers / this.totalRiddles) * 100 : 0;
    }

    getConsecutiveRounds() {
        return this.totalGames;
    }

    addAchievement(achievement) {
        if (!this.achievements.find(a => a.name === achievement.name)) {
            this.achievements.push(achievement);
        }
    }

    loadStats(data) {
        Object.assign(this, data);
        this.sessions = data.sessions || [];
        this.achievements = data.achievements || [];
        this.createdAt = new Date(data.createdAt);
        this.lastPlayed = new Date(data.lastPlayed);
    }

    toJSON() {
        return {
            name: this.name,
            totalGames: this.totalGames,
            totalTime: this.totalTime,
            totalRiddles: this.totalRiddles,
            correctAnswers: this.correctAnswers,
            bestTime: this.bestTime,
            sessions: this.sessions,
            achievements: this.achievements,
            createdAt: this.createdAt.toISOString(),
            lastPlayed: this.lastPlayed.toISOString()
        };
    }
}