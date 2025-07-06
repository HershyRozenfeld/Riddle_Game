import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import readlineSync from 'readline-sync';

const filePath = path.resolve("data/riddles.txt");

/**
 * Reads all riddles from the file
 * @returns {Promise<Object>} Object containing all riddles
 */
export async function readRiddlesFromFile() {
    try {
        const data = await readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading the file:", err);
        return { Easy: [], Medium: [], Hard: [] };
    }
}

/**
 * Writes riddles to the file
 * @param {Object} riddlesData - Riddles object
 */
export async function writeRiddlesToFile(riddlesData) {
    try {
        await writeFile(filePath, JSON.stringify(riddlesData, null, 4));
        console.log("File updated successfully!");
    } catch (err) {
        console.error("Error writing to file:", err);
    }
}

/**
 * Displays all riddles
 */
export async function getRiddles() {
    try {
        const riddlesData = await readRiddlesFromFile();

        console.log("\n=== All Riddles ===");
        Object.keys(riddlesData).forEach(level => {
            console.log(`\n--- ${level} ---`);
            riddlesData[level].forEach(riddle => {
                console.log(`ID: ${riddle.id} | Name: ${riddle.name}`);
                console.log(`Question: ${riddle.TaskDescription}`);
                console.log(`Answer: ${riddle.CorrectAnswer}\n`);
            });
        });
    } catch (err) {
        console.error("Error displaying riddles:", err);
    }
}

/**
 * Adds a new riddle
 */
export async function setRiddles() {
    try {
        const riddlesData = await readRiddlesFromFile();

        console.log("\n=== Add New Riddle ===");
        let level = readlineSync.question('Select difficulty (Easy/Medium/Hard): ');

        if (!['Easy', 'Medium', 'Hard'].includes(level)) {
            console.log("Invalid level! Defaulting to Easy.");
            level = 'Easy';
        }

        const allIds = Object.values(riddlesData).flat().map(r => r.id);
        const newId = Math.max(...allIds, 0) + 1;

        const name = readlineSync.question('Riddle name: ');
        const taskDescription = readlineSync.question('Riddle description: ');
        const correctAnswer = parseInt(readlineSync.question('Correct answer (number): '));

        if (isNaN(correctAnswer)) {
            console.log("Answer must be a number!");
            return;
        }

        const newRiddle = {
            id: newId,
            name: name,
            TaskDescription: taskDescription,
            CorrectAnswer: correctAnswer
        };

        riddlesData[level].push(newRiddle);
        await writeRiddlesToFile(riddlesData);

        console.log(`New riddle added successfully to level ${level}!`);

    } catch (err) {
        console.error("Error adding riddle:", err);
    }
}

/**
 * Updates an existing riddle
 */
export async function updateRiddle() {
    try {
        const riddlesData = await readRiddlesFromFile();

        console.log("\n=== Update Riddle ===");
        const riddleId = parseInt(readlineSync.question('Enter riddle ID to update: '));

        if (isNaN(riddleId)) {
            console.log("ID must be a number!");
            return;
        }

        let foundRiddle = null;
        let foundLevel = null;

        for (const [level, riddles] of Object.entries(riddlesData)) {
            const riddle = riddles.find(r => r.id === riddleId);
            if (riddle) {
                foundRiddle = riddle;
                foundLevel = level;
                break;
            }
        }

        if (!foundRiddle) {
            console.log("Riddle with this ID not found!");
            return;
        }

        console.log(`\nRiddle found in level ${foundLevel}:`);
        console.log(`Name: ${foundRiddle.name}`);
        console.log(`Description: ${foundRiddle.TaskDescription}`);
        console.log(`Answer: ${foundRiddle.CorrectAnswer}`);

        console.log("\nEnter new values (press Enter to keep current):");

        const newName = readlineSync.question(`New name [${foundRiddle.name}]: `);
        const newTaskDescription = readlineSync.question(`New description [${foundRiddle.TaskDescription}]: `);
        const newCorrectAnswerStr = readlineSync.question(`New answer [${foundRiddle.CorrectAnswer}]: `);

        if (newName.trim()) foundRiddle.name = newName.trim();
        if (newTaskDescription.trim()) foundRiddle.TaskDescription = newTaskDescription.trim();
        if (newCorrectAnswerStr.trim()) {
            const newCorrectAnswer = parseInt(newCorrectAnswerStr.trim());
            if (!isNaN(newCorrectAnswer)) {
                foundRiddle.CorrectAnswer = newCorrectAnswer;
            }
        }

        await writeRiddlesToFile(riddlesData);
        console.log("Riddle updated successfully!");

    } catch (err) {
        console.error("Error updating riddle:", err);
    }
}

/**
 * Deletes a riddle
 */
export async function deleteRiddle() {
    try {
        const riddlesData = await readRiddlesFromFile();

        console.log("\n=== Delete Riddle ===");
        const riddleId = parseInt(readlineSync.question('Enter riddle ID to delete: '));

        if (isNaN(riddleId)) {
            console.log("ID must be a number!");
            return;
        }

        let foundRiddle = null;
        let foundLevel = null;
        let foundIndex = -1;

        for (const [level, riddles] of Object.entries(riddlesData)) {
            const index = riddles.findIndex(r => r.id === riddleId);
            if (index !== -1) {
                foundRiddle = riddles[index];
                foundLevel = level;
                foundIndex = index;
                break;
            }
        }

        if (!foundRiddle) {
            console.log("Riddle with this ID not found!");
            return;
        }

        console.log(`\nRiddle found in level ${foundLevel}:`);
        console.log(`Name: ${foundRiddle.name}`);
        console.log(`Description: ${foundRiddle.TaskDescription}`);

        const confirm = readlineSync.question('Are you sure you want to delete this riddle? (yes/no): ');

        if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
            riddlesData[foundLevel].splice(foundIndex, 1);
            await writeRiddlesToFile(riddlesData);
            console.log("Riddle deleted successfully!");
        } else {
            console.log("Deletion cancelled.");
        }

    } catch (err) {
        console.error("Error deleting riddle:", err);
    }
}

/**
 * Gets riddles by level
 * @param {string} level - Difficulty level
 * @returns {Promise<Array>} Array of riddles
 */
export async function getRiddlesByLevel(level = "Easy") {
    try {
        const riddlesData = await readRiddlesFromFile();
        return riddlesData[level] || [];
    } catch (err) {
        console.error("Error loading riddles:", err);
        return [];
    }
}
