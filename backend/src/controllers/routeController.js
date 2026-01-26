const engineBridge = require('../services/engineBridge');

const findRoute = async (req, res, next) => {
    try {
        const requestData = req.body;

        // Call the C++ engine bridge
        const result = await engineBridge.execute(requestData);

        if (result.status === 'success') {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { findRoute };
