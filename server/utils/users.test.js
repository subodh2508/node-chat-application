const expect = require('expect');

const {Users} = require('./users');

var users;
beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Sam',
        room: 'Node Course',
    },
    {
        id: '2',
        name: 'Sameer',
        room: 'React Course',
    },
    {
        id: '3',
        name: 'Samir',
        room: 'Node Course',
    }];
});

describe('Users', () => {
    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '1',
            name: 'Sam',
            room: 'Test',
        };
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names of node courses', () => {
        const usersList = users.getUserList('Node Course');
        expect(usersList).toEqual(['Sam', 'Samir']);
    });

    it('should return names of react courses', () => {
        const usersList = users.getUserList('React Course');
        expect(usersList).toEqual(['Sameer']);
    });

    it('should remove the user', () => {
        const usersList = users.removeUser('1');
        expect(usersList).toEqual({
            id: '1',
            name: 'Sam',
            room: 'Node Course',
        });
        expect(users.users.length).toBe(2);
    });

    it('should not remove the user', () => {
        const usersList = users.removeUser('11');
        expect(usersList).toEqual(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should find the user', () => {
        const userId = '1';
        const user = users.getUser(userId);
        expect(user.id).toEqual(userId);
    });

    it('should not find the user', () => {
        const userId = '12';
        const user = users.getUser(userId);
        expect(user).toNotExist();
    });

});