const { operationService } = require('./helpers');
const chai = require('chai');
const expect = require('chai').expect;
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Operation Service', function () {
    beforeEach(async () => {
        await operationService.deleteAll();
    });

    describe('create(command, result)', () => {
        it('should return response true when set command 11+12 and result 33', (done) => {
            operationService.create("11+12", "33").
            then(response => {
                expect(response).to.equal(true);
                done();
            }).
            catch(err => done(err));
        });

        it('should return response false command 1+2 and result undefined', (done) => {
            operationService.create("1+2", undefined).
            then(response => {
                expect(response).to.equal(false);
                done();
            }).
            catch(err => done(err));
        });
    });

    describe('getAll(limit)', () => {
        it('should return one item when set limit 1', (done) => {
            operationService.create("11+12", "33").
                then(response => {
                    operationService.getAll(1).
                        then(items => {
                            expect(items.length).to.equal(1);
                            done();
                        }).
                        catch(err => done(err));
                    
                }).
                catch(err => done(err));
        });
    });
});