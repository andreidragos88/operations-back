import { operationService, socketEvents } from './helpers';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe('Socket events', function () {
    beforeEach(async () => {
        await operationService.deleteAll();
    });

    describe('getOperationResult(data)', () => {
        it('should return error false and result 5 when set data 2+3', (done) => {
            socketEvents.getOperationResult("2 + 3").
                then(response => {
                    expect(response.error).to.equal(false);
                    expect(response.result).to.equal(5);
                    done();
                }).
                catch(err => done(err));
        });

        it('should return error true when set data `not valid`', (done) => {
            socketEvents.getOperationResult("not valid").
                then(response => {
                    expect(response.error).to.equal(true);
                    done();
                }).
                catch(err => done(err));
        });
    });

    describe('getSenderMessage(data)', () => {
        it('should return error false and action input', () => {
            const response = socketEvents.getSenderMessage("2+3");
            expect(response.error).to.equal(false);
            expect(response.action).to.equal('input');
        })
    })
});