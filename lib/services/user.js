'use strict';

const { Service }        = require('schmervice');

module.exports = class UserService extends Service {


    async initialize(){ // CALLED ON SERVER INITIALIZATION (onPreStart)

        const { User } = this.server.models()

        // set up stuff here
        this.users = await User.query();
    }

    async teardown(){ // CALLED ON SERVER STOP (OnPostStop)

        // tear down stuff here
    }

    hello(user){

        return `Hello ${user.firstName}`;
    }

    add(user){

        this.users.push(user);
    }

    getAll(){
        return this.users;
    }

    async getById(id){
        const { User } = this.server.models()

        return await User.query()
                .where('id', '=', id);
    }

}
