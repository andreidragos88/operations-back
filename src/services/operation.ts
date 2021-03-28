import Operation from '../models/operation';
import logger from '../utils/logger';

const getAll = async (limit) => {
    return await Operation.find()
        .sort([['createdAt', -1]])
        .limit(limit);
};

const create = async (command, result) => {
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

const deleteAll = async () => {
    try {
        await Operation.deleteMany(() => { });

        return true;
    } catch (e) {
        logger.error(e);

        return false;
    }
}

export {
    create,
    getAll,
    deleteAll
}