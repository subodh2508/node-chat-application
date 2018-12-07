const expect = require('expect');
const {generateMessege} = require('./messege');
describe('generateMessege', () => {
    it('should generate correct messege object', () => {
        const from = 'test';
        const text = 'This is msg';
        const messege = generateMessege(from, text);
        expect(messege.createdAt).toBeA('number');
        expect(messege).toInclude({from, text});
    });
});