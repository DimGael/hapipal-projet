'use strict';

const { Service }        = require('schmervice');

module.exports = class UserService extends Service {


    async initialize(){ // CALLED ON SERVER INITIALIZATION (onPreStart)

        const { User } = this.server.models()

        // set up stuff here
        this.user = User;
    }

    async teardown(){ // CALLED ON SERVER STOP (OnPostStop)

        // tear down stuff here
    }

    hello(user){

        return `Hello ${user.firstName}`;
    }

    async add(user){

        user.created_at = new Date()

        await this.user.insert(user);
    }

    async getAll(){
        return await this.user.query();
    }

    async getById(id){
        return await this.user.query()
                .where('id', '=', id);
    }

}
