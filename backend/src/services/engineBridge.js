const { spawn } = require('child_process');
const { ENGINE_PATH, DATA_PATH } = require('../config/constants');

/**
 * Executes the C++ routing engine with the provided request payload.
 * @param {Object} payload - The routing request parameters.
 * @returns {Promise<Object>} - The engine result.
 */
const execute = (payload) => {
    return new Promise((resolve, reject) => {
        // In a real scenario, we'd spawn the ENGINE_PATH.
        // For now, let's implement a mock that simulates the engine response if the binary doesn't exist.

        try {
            const engine = spawn(ENGINE_PATH, [DATA_PATH]);

            let stdoutData = '';
            let stderrData = '';

            engine.stdin.write(JSON.stringify(payload));
            engine.stdin.end();

            engine.stdout.on('data', (data) => {
                stdoutData += data.toString();
            });

            engine.stderr.on('data', (data) => {
                stderrData += data.toString();
            });

            engine.on('close', (code) => {
                if (code !== 0) {
                    return resolve({
                        status: 'error',
                        message: `Engine exited with code ${code}`,
                        stderr: stderrData
                    });
                }
                try {
                    const result = JSON.parse(stdoutData);
                    resolve(result);
                } catch (e) {
                    resolve({
                        status: 'error',
                        message: 'Failed to parse engine output',
                        raw: stdoutData
                    });
                }
            });

            engine.on('error', (err) => {
                // If engine binary is not found, return a mock response for development
                if (err.code === 'ENOENT') {
                    console.warn(`Engine binary NOT FOUND at ${ENGINE_PATH}. Returning mock data.`);
                    return resolve(getMockResponse(payload));
                }
                reject(err);
            });

        } catch (error) {
            reject(error);
        }
    });
};

const getMockResponse = (payload) => {
    return {
        status: 'success',
        data: {
            total_time: 1580,
            switches: 1,
            segments: [
                {
                    train_number: "12541",
                    from: payload.source,
                    to: "LKO",
                    departure: "14:20",
                    arrival: "19:30"
                },
                {
                    train_number: "12533",
                    from: "LKO",
                    to: payload.destination,
                    departure: "20:15",
                    arrival: "06:30"
                }
            ]
        }
    };
};

module.exports = { execute };
