import { identifyOrCreatePlayer, showPlayerStats } from '../utils/playersManager.js';

export default function Player() {
    this.playerData = null;
    
    /**
     * Identifies or creates a new player
     */
    this.identify = async function() {
        this.playerData = await identifyOrCreatePlayer();
        return this.playerData;
    }
    
    /**
     * Returns the player data
     */
    this.getPlayerData = function() {
        return this.playerData;
    }
    
    /**
     * Displays the player's statistics
     */
    this.showStats = function() {
        if (this.playerData) {
            showPlayerStats(this.playerData);
        }
    }
    
    /**
     * Saves the time it took to solve a riddle
     */
    this.recordTime = function(start, end) {
        this.time = end - start;
    }
}
