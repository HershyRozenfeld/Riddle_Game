import { getRiddlesByLevel } from './crudUtils.js';

/**
 * Returns statistics about the player's progress
 * @param {Object} player - The player object
 * @returns {Promise<Object>} Detailed statistics
 */
export async function getPlayerProgress(player) {
    const levels = ["Easy", "Medium", "Hard"];
    const progress = {};
    
    for (const level of levels) {
        const allRiddles = await getRiddlesByLevel(level);
        const solvedInLevel = allRiddles.filter(riddle => 
            player.solvedRiddles.includes(riddle.id)
        ).length;
        
        progress[level] = {
            total: allRiddles.length,
            solved: solvedInLevel,
            remaining: allRiddles.length - solvedInLevel,
            percentage: allRiddles.length > 0 ? Math.round((solvedInLevel / allRiddles.length) * 100) : 0
        };
    }
    
    return progress;
}

/**
 * Displays detailed progress of the player
 * @param {Object} player - The player object
 */
export async function showDetailedProgress(player) {
    const progress = await getPlayerProgress(player);
    
    console.log(`\n=== Detailed Progress for ${player.name} ===`);
    
    for (const [level, stats] of Object.entries(progress)) {
        console.log(`\n${level}:`);
        console.log(`  ✅ Solved: ${stats.solved}/${stats.total} (${stats.percentage}%)`);
        console.log(`  ⏳ Remaining: ${stats.remaining}`);
        
        // Visual progress bar
        const progressBar = "█".repeat(Math.floor(stats.percentage / 10)) + 
                            "░".repeat(10 - Math.floor(stats.percentage / 10));
        console.log(`  📊 [${progressBar}] ${stats.percentage}%`);
    }
}

/**
 * Returns a recommended level to continue
 * @param {Object} player - The player object
 * @returns {Promise<string>} Recommended level
 */
export async function getRecommendedLevel(player) {
    const progress = await getPlayerProgress(player);
    
    if (progress.Easy.remaining > 0) {
        return "Easy";
    }
    
    if (progress.Medium.remaining > 0) {
        return "Medium";
    }
    
    if (progress.Hard.remaining > 0) {
        return "Hard";
    }
    
    return null; // All levels completed
}

/**
 * Calculates the player's rank compared to other players
 * @param {Object} currentPlayer - The current player
 * @param {Array} allPlayers - All players
 * @returns {Object} Player ranking
 */
export function calculatePlayerRank(currentPlayer, allPlayers) {
    // Sort by number of solved riddles
    const sortedByRiddles = allPlayers
        .sort((a, b) => b.stats.totalRiddles - a.stats.totalRiddles);
    
    // Sort by average time (lower is better)
    const sortedBySpeed = allPlayers
        .filter(p => p.stats.totalRiddles > 0)
        .sort((a, b) => a.stats.averageTimeSeconds - b.stats.averageTimeSeconds);
    
    const riddleRank = sortedByRiddles.findIndex(p => p.id === currentPlayer.id) + 1;
    const speedRank = sortedBySpeed.findIndex(p => p.id === currentPlayer.id) + 1;
    
    return {
        riddleRank,
        speedRank,
        totalPlayers: allPlayers.length,
        riddlePercentile: Math.round((1 - riddleRank / allPlayers.length) * 100),
        speedPercentile: sortedBySpeed.length > 0 ? Math.round((1 - speedRank / sortedBySpeed.length) * 100) : 0
    };
}
