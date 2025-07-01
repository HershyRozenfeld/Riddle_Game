import { GameFlow } from './GameFlow.js';
import { Player } from '../models/Player.js';
import { ScoreManager } from '../managers/ScoreManager.js';
import { UIManager } from '../managers/UIManager.js';
import { Logger } from '../utils/Logger.js';
import { GameConfig } from '../config/GameConfig.js';

export class Game {
    constructor() {
        this.ui = new UIManager();
        this.scoreManager = new ScoreManager();
        this.gameFlow = new GameFlow(this.ui, this.scoreManager);
        this.player = null;
    }

    async start() {
        try {
            await this.ui.showWelcome();
            
            this.player = await this.createPlayer();
            this.gameFlow.setPlayer(this.player);

            const playAgain = true;
            while (playAgain) {
                await this.playRound();
                
                const shouldContinue = await this.ui.askPlayAgain();
                if (!shouldContinue) break;
            }

            await this.ui.showFarewell(this.player);
            
        } catch (error) {
            Logger.error('Error during the game:', error);
            await this.ui.showError('An error occurred during the game');
        }

    }

    async createPlayer() {
        const name = await this.ui.askPlayerName();
        const player = new Player(name);
        
        // טעינת נתונים קיימים של השחקן
        const existingData = this.scoreManager.loadPlayerStats(name);
        if (existingData) {
            player.loadStats(existingData);
            await this.ui.showWelcomeBack(player);
        }
        
        return player;
    }

    async playRound() {
        const difficulty = await this.ui.askDifficulty();
        const gameMode = await this.ui.askGameMode();
        
        await this.gameFlow.playRound(difficulty, gameMode);
        
        // שמירת נתונים
        this.scoreManager.savePlayerStats(this.player);
    }
}