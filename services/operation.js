const Operation = require('../models/operation');
const { logger } = require('../utils/logger');

exports.getAll = async (limit) => {
    return await Operation.find()
        .sort([['createdAt', -1]])
        .limit(limit);
};

exports.create = async (command, result) => {
    try {
        const operation = new Operation({
            command: command,
            result: result
        });

        await operation.save();

        return true;
    } catch (e) {
        logger.error(e);

        return false;
    }
};

exports.deleteAll = async () => {
    try {
        await Operation.deleteMany(() => { });

        return true;
    } catch (e) {
        logger.error(e);

        return false;
    }
}