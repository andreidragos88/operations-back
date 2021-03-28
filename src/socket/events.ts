import Message from '../types/message';
import * as math from 'mathjs';
import * as operationService from '../services/operation';
import removeSpaces from '../utils/removeSpaces';
import logger from '../utils/logger';

const getHistory = async (): Promise<Message> => {
    const nrOfOperations: number = 10;
    const command: string = 'history';

    try {
        const operations = await operationService.getAll(nrOfOperations);
        
        return {
            command: command,
            error: false,
            result: operations,
            action: 'output',
            timestamp: Date.now()
        }
        
    } catch (err) {
        logger.error(err);
        return getErrorMessage(command);
    }
};

const getOperationResult = async (data: string): Promise<Message> => {
    const input = removeSpaces(data);

    if (!isValidOperation(input)) {
        return getErrorMessage(data);
    }

    try {
        let operationResult = math.evaluate(input);
        await operationService.create(input, operationResult);

        return {
            command: data,
            error: false,
            result: math.evaluate(input),
            action: 'output',
            timestamp: Date.now()
        }
    } catch (e) {
        logger.error(e);
        return getErrorMessage(data);
    }
};

const getSenderMessage = (data: string): Message => ({
    command: '',
    error: false,
    result: 'You: ' + data,
    timestamp: Date.now(),
    action: 'input'
});

export {
    getSenderMessage,
    getOperationResult,
    getHistory
}

const isValidOperation = (operation: string): boolean => {
    const reg = new RegExp('^([-+/*]\d+(\.\d+)?)*');
    return reg.test(operation);
}

const getErrorMessage = (command: string): Message => ({
    command: command,
    error: true,
    result: 'Error',
    action: 'output',
    timestamp: Date.now()
});