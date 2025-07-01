import { Game } from './src/core/Game.js';
import { Logger } from './src/utils/Logger.js';

async function main() {
    try {
        const game = new Game();
        await game.start();
    } catch (error) {
        Logger.error('Error launching the game:', error.message);
        process.exit(1);
    }
}

main();