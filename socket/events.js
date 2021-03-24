const operationService = require('../services/operation');
const utils = require('../utils/removeSpaces');
const { logger } = require('../utils/logger');

exports.getHistory = async () => {
    const messageInfo = {
        action: 'output',
        timestamp: Date.now()
    }
    const nrOfOperations = 10;
    
    try {
        const operations = await operationService.getAll(nrOfOperations);
        
        return {
            error: false,
            result: operations,
            ...messageInfo
        }
        
    } catch (err) {
        logger.error(err);

        return {
            error: true,
            result: 'Error',
            ...messageInfo
        };
    }
};

exports.getOperationResult = async (data) => {
    const input = utils.removeSpaces(data);

    let messageInfo = {
        action: 'output',
        timestamp: Date.now()
    }

    if (!isValidOperation(input)) {
        return {
            error: true,
            result: 'Error',
            ...messageInfo
        };
    }

    try {
        let operationResult = eval(input);
        await operationService.create(input, operationResult);

        return {
            error: false,
            result: eval(input),
            ...messageInfo
        }
    } catch (e) {
        logger.error(err);

        return {
            error: true,
            result: 'Error',
            ...messageInfo
        };
    }
};

exports.getSenderMessage = (data) => ({
    error: false,
    result: 'You: ' + data,
    timestamp: Date.now(),
    action: 'input'
});

const isValidOperation = (operation) => {
    const reg = new RegExp('^([-+/*]\d+(\.\d+)?)*');
    return reg.test(operation);
}