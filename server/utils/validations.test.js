const expect = require('expect');
const {isRealString} = require('./validations');
describe('isRealString', () => {
    it('should reject non string values', () => {
        const name = '';
        const messege = isRealString(name);
        console.log('messege', messege)
        expect(messege).toBe(false);
    });
    it('should reject string with spaces', () => {
        const name = '     ';
        const messege = isRealString(name);
        console.log('messege', messege)
        expect(messege).toBe(false);
    });
    it('should accept string with non-space character', () => {
        const name = 'name';
        const messege = isRealString(name);
        console.log('messege', messege)
        expect(messege).toBe(true);
    });
});
