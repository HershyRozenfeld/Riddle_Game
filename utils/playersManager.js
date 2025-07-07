import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import readlineSync from 'readline-sync';

const filePath = path.resolve("data/players.json");

/**
 * Reads the list of players from the file
 * @returns {Promise<Object>} An object containing all players
 */
export async function readPlayersFromFile() {
    try {
        const data = await readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading players file:", err);
        return { players: [] };
    }
}

/**
 * Writes the list of players to the file
 * @param {Object} playersData - The players object
 */
export async function writePlayersToFile(playersData) {
    try {
        await writeFile(filePath, JSON.stringify(playersData, null, 4));
    } catch (err) {
        console.error("Error writing players file:", err);
    }
}

/**
 * Finds a player by name or email
 * @param {string} identifier - Player name or email
 * @returns {Promise<Object|null>} The player or null if not found
 */
export async function findPlayer(identifier) {
    const playersData = await readPlayersFromFile();
    const player = playersData.players.find(p => 
        p.name.toLowerCase() === identifier.toLowerCase() || 
        p.email.toLowerCase() === identifier.toLowerCase()
    );
    return player || null;
}

/**
 * Creates a new player
 * @param {string} name - Player name
 * @param {string} email - Player email
 * @returns {Promise<Object>} The new player
 */
export async function createPlayer(name, email) {
    const playersData = await readPlayersFromFile();
    
    // Find next ID
    const allIds = playersData.players.map(p => p.id);
    const newId = Math.max(...allIds, 0) + 1;
    
    const newPlayer = {
        id: newId,
        name: name,
        email: email,
        solvedRiddles: [],
        stats: {
            totalRiddles: 0,
            totalTimeSeconds: 0,
            averageTimeSeconds: 0,
            levelProgress: {
                Easy: 0,
                Medium: 0,
                Hard: 0
            }
        },
        lastPlayed: new Date().toISOString()
    };
    
    playersData.players.push(newPlayer);
    await writePlayersToFile(playersData);
    
    return newPlayer;
}

/**
 * Updates an existing player
 * @param {Object} player - The updated player
 */
export async function updatePlayer(player) {
    const playersData = await readPlayersFromFile();
    const index = playersData.players.findIndex(p => p.id === player.id);
    
    if (index !== -1) {
        player.lastPlayed = new Date().toISOString();
        playersData.players[index] = player;
        await writePlayersToFile(playersData);
    }
}

/**
 * Filters riddles the player hasn't solved yet
 * @param {Array} riddles - Array of riddles
 * @param {Object} player - The player
 * @returns {Array} Array of unsolved riddles
 */
export function filterUnsolvedRiddles(riddles, player) {
    return riddles.filter(riddle => !player.solvedRiddles.includes(riddle.id));
}

/**
 * Adds a solved riddle to the player's record
 * @param {Object} player - The player
 * @param {Object} riddle - The riddle
 * @param {number} timeSeconds - Time taken to solve
 * @param {string} level - Difficulty level
 */
export function addSolvedRiddle(player, riddle, timeSeconds, level) {
    if (!player.solvedRiddles.includes(riddle.id)) {
        player.solvedRiddles.push(riddle.id);
        player.stats.totalRiddles++;
        player.stats.totalTimeSeconds += timeSeconds;
        player.stats.averageTimeSeconds = Math.round(player.stats.totalTimeSeconds / player.stats.totalRiddles);
        player.stats.levelProgress[level]++;
    }
}

/**
 * Identifies or creates a new player
 * @returns {Promise<Object>} The player
 */
export async function identifyOrCreatePlayer() {
    console.log("\n=== Player Identification ===");
    
    const identifier = readlineSync.question('Enter name or email: ');
    let player = await findPlayer(identifier);
    
    if (player) {
        console.log(`Welcome back, ${player.name}! 🎮`);
        console.log(`You have already solved ${player.stats.totalRiddles} riddles`);
        
        // Show progress by level
        console.log("Progress by level:");
        Object.entries(player.stats.levelProgress).forEach(([level, count]) => {
            console.log(`  ${level}: ${count} riddles`);
        });
        
        return player;
    } else {
        console.log("Couldn't find you in the system. Let's add you! 🆕");
        
        const name = readlineSync.question("What's your name? ");
        const email = readlineSync.question("What's your email? ");
        
        player = await createPlayer(name, email);
        console.log(`Great! You’ve been successfully registered, ${name}! 🎉`);
        
        return player;
    }
}

/**
 * Displays player statistics
 * @param {Object} player - The player
 */
export function showPlayerStats(player) {
    console.log(`\n=== Statistics for ${player.name} ===`);
    console.log(`Total riddles solved: ${player.stats.totalRiddles}`);
    console.log(`Average time per riddle: ${Math.floor(player.stats.averageTimeSeconds / 60)}:${(player.stats.averageTimeSeconds % 60).toString().padStart(2, '0')}`);
    console.log(`Total time: ${Math.floor(player.stats.totalTimeSeconds / 60)}:${(player.stats.totalTimeSeconds % 60).toString().padStart(2, '0')}`);
    
    console.log("\nProgress by level:");
    Object.entries(player.stats.levelProgress).forEach(([level, count]) => {
        console.log(`  ${level}: ${count} riddles`);
    });
}
