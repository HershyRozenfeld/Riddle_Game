export const GameConfig = {
    difficulties: {
        easy: {
            name: 'Easy',
            minNumber: 1,
            maxNumber: 10,
            timeBonus: 1.5
        },
        medium: {
            name: 'Medium',
            minNumber: 10,
            maxNumber: 100,
            timeBonus: 1.2
        },
        hard: {
            name: 'Hard',
            minNumber: 100,
            maxNumber: 1000,
            timeBonus: 1.0
        },
        challenge: {
            name: 'Challenge',
            minNumber: 1,
            maxNumber: 10000,
            timeBonus: 0.8
        }
    },

    gameModes: {
        quick: {
            name: 'Quick',
            riddleCount: 5,
            scoreMultiplier: 1.0
        },
        normal: {
            name: 'Normal',
            riddleCount: 10,
            scoreMultiplier: 1.2
        },
        marathon: {
            name: 'Marathon',
            riddleCount: 20,
            scoreMultiplier: 1.5
        },
        extreme: {
            name: 'Extreme',
            riddleCount: 50,
            scoreMultiplier: 2.0
        }
    },

    scoring: {
        baseScore: 100,
        timeThresholds: {
            excellent: 3,  // Less than 3 seconds
            good: 7,       // Less than 7 seconds
            average: 15    // Less than 15 seconds
        },
        multipliers: {
            excellent: 2.0,
            good: 1.5,
            average: 1.2,
            slow: 1.0
        }
    },

    achievements: {
        speedDemon: {
            name: 'Speed Demon',
            description: 'Solve 10 riddles in a row in under 3 seconds each',
            requirement: { type: 'speed', value: 3, count: 10 }
        },
        perfectionist: {
            name: 'Perfectionist',
            description: 'Solve 20 riddles in a row on the first try',
            requirement: { type: 'accuracy', value: 100, count: 20 }
        },
        marathoner: {
            name: 'Marathoner',
            description: 'Complete 5 marathon games',
            requirement: { type: 'marathon', count: 5 }
        },
        consistent: {
            name: 'Consistent',
            description: 'Play 10 days in a row',
            requirement: { type: 'daily', count: 10 }
        }
    }
};
