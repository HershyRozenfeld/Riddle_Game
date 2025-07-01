import fs from 'fs';
import path from 'path';
import { Logger } from '../utils/Logger.js';

export class ScoreManager {
    constructor() {
        this.dataDir = './data';
        this.scoresFile = path.join(this.dataDir, 'scores.json');
        this.ensureDataDirectory();
    }

    ensureDataDirectory() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }

    loadPlayerStats(playerName) {
        try {
            if (!fs.existsSync(this.scoresFile)) {
                return null;
            }

            const data = fs.readFileSync(this.scoresFile, 'utf8');
            const allScores = JSON.parse(data);

            return allScores[playerName] || null;
        } catch (error) {
            Logger.error('Error loading player data:', error);
            return null;
        }
    }

    savePlayerStats(player) {
        try {
            let allScores = {};

            if (fs.existsSync(this.scoresFile)) {
                const data = fs.readFileSync(this.scoresFile, 'utf8');
                allScores = JSON.parse(data);
            }

            allScores[player.name] = player.toJSON();

            fs.writeFileSync(this.scoresFile, JSON.stringify(allScores, null, 2));
            Logger.info(`Player data for ${player.name} saved successfully`);
        } catch (error) {
            Logger.error('Error saving player data:', error);
        }
    }

    getLeaderboard(limit = 10) {
        try {
            if (!fs.existsSync(this.scoresFile)) {
                return [];
            }

            const data = fs.readFileSync(this.scoresFile, 'utf8');
            const allScores = JSON.parse(data);

            return Object.values(allScores)
                .sort((a, b) => b.correctAnswers - a.correctAnswers)
                .slice(0, limit);
        } catch (error) {
            Logger.error('Error loading leaderboard:', error);
            return [];
        }
    }

    exportStats(playerName, format = 'json') {
        try {
            const stats = this.loadPlayerStats(playerName);
            if (!stats) return null;

            const exportDir = './exports';
            if (!fs.existsSync(exportDir)) {
                fs.mkdirSync(exportDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `${playerName}_stats_${timestamp}.${format}`;
            const filepath = path.join(exportDir, filename);

            if (format === 'json') {
                fs.writeFileSync(filepath, JSON.stringify(stats, null, 2));
            } else if (format === 'csv') {
                const csv = this.convertToCSV(stats);
                fs.writeFileSync(filepath, csv);
            }

            return filepath;
        } catch (error) {
            Logger.error('Error exporting player stats:', error);
            return null;
        }
    }

    convertToCSV(stats) {
        const headers = ['Name', 'Games', 'Avg Time', 'Accuracy (%)', 'Achievements'];
        const values = [
            stats.name,
            stats.totalGames,
            stats.totalRiddles > 0 ? (stats.totalTime / stats.totalRiddles).toFixed(2) : '0',
            stats.totalRiddles > 0 ? ((stats.correctAnswers / stats.totalRiddles) * 100).toFixed(1) : '0',
            stats.achievements.length
        ];

        return [headers.join(','), values.join(',')].join('\n');
    }
}