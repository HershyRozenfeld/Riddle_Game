import { RiddleFactory } from '../factories/RiddleFactory.js';
import { RiddleSession } from '../models/RiddleSession.js';
import { GameConfig } from '../config/GameConfig.js';

export class GameFlow {
    constructor(uiManager, scoreManager) {
        this.ui = uiManager;
        this.scoreManager = scoreManager;
        this.player = null;
        this.riddleFactory = new RiddleFactory();
    }

    setPlayer(player) {
        this.player = player;
    }

    async playRound(difficulty, gameMode) {
        const config = GameConfig.difficulties[difficulty];
        const riddleCount = GameConfig.gameModes[gameMode].riddleCount;
        
        const session = new RiddleSession(this.player, difficulty, gameMode);
        
        await this.ui.showRoundStart(difficulty, gameMode, riddleCount);
        
        for (let i = 0; i < riddleCount; i++) {
            await this.ui.showProgress(i + 1, riddleCount);
            
            const riddle = this.riddleFactory.createRiddle(difficulty);
            const result = await this.playRiddle(riddle, i + 1);
            
            session.addResult(result);
            
            // הצגת תוצאה מיידית
            await this.ui.showRiddleResult(result);
            
            // הפסקה קטנה בין חידות
            if (i < riddleCount - 1) {
                await this.ui.showBreak();
            }
        }
        
        // הצגת סיכום הסיבוב
        await this.ui.showRoundSummary(session);
        
        // עדכון סטטיסטיקות השחקן
        this.player.addSession(session);
        
        // בדיקת הישגים
        const achievements = this.checkAchievements(session);
        if (achievements.length > 0) {
            await this.ui.showAchievements(achievements);
        }
    }

    async playRiddle(riddle, riddleNumber) {
        const startTime = Date.now();
        let attempts = 0;
        let isCorrect = false;
        let userAnswer;

        await this.ui.showRiddleStart(riddle, riddleNumber);

        while (!isCorrect) {
            attempts++;
            userAnswer = await this.ui.askRiddle(riddle, attempts);
            
            if (userAnswer === null) {
                // השחקן ביקש רמז או עזרה
                await this.ui.showHint(riddle);
                continue;
            }
            
            isCorrect = riddle.checkAnswer(userAnswer);
            
            if (!isCorrect) {
                await this.ui.showWrongAnswer(attempts);
            }
        }

        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000);

        return {
            riddle,
            duration,
            attempts,
            isCorrect: true,
            userAnswer
        };
    }

    checkAchievements(session) {
    const achievements = [];
    
    // Speed
    if (session.getAverageTime() < 5) {
        achievements.push({
            type: 'speed',
            name: 'Math Lightning',
            description: 'You solved all the riddles in under 5 seconds on average!'
        });
    }
    
    // Accuracy
    if (session.getAccuracy() === 100) {
        achievements.push({
            type: 'accuracy',
            name: 'Perfect!',
            description: 'You solved all the riddles on the first try!'
        });
    }
    
    // Consecutive rounds
    if (this.player.getConsecutiveRounds() >= 5) {
        achievements.push({
            type: 'persistence',
            name: 'Consistent Player',
            description: 'You played 5 rounds in a row!'
        });
    }
    
    return achievements;
}

}