const expect = require('expect');
const {generateMessege, generateLocationMessege} = require('./messege');
describe('generateMessege', () => {
    it('should generate correct messege object', () => {
        const from = 'test';
        const text = 'This is msg';
        const messege = generateMessege(from, text);
        expect(messege.createdAt).toBeA('number');
        expect(messege).toInclude({from, text});
    });
});

describe('generateLocationMessege', () => {
    it('should generate correct Location object', () => {
        const from = 'Deb';
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps?q=15,19';
        const messege = generateLocationMessege(from, latitude, longitude);
        expect(messege.createdAt).toBeA('number');
        expect(messege).toInclude({from, url});
    });
});