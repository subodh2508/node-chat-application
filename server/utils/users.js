class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUserList(room) {
        const users = this.users.filter(user => user.room === room);
        const namesArray = users.map(user => user.name);
        return namesArray;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    removeUser(id) {
        const user = this.getUser(id);
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }
}

module.exports = {Users};