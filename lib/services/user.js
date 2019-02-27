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

     // Si l'utilsateur a été modifié, renvoie ses infos
    async update(id, userData){
        userData.updated_at = new Date()

        return await this.user.query()
                .patchAndFetchById(id, userData)
                .returning('*');
    }

    async add(user){

        user.created_at = new Date()

        await this.user.query().insert(user);
    }

    async getAll(){
        return await this.user.query();
    }

    async getById(id){
        return await this.user.query()
                .where('id', '=', id);
    }

    /**
     * Retourne vrai si un utilisateur a été supprimé
     * @param {int} id l'id de l'user
     */
    async delete(id){
        return await this.user.query()
            .deleteById(id)
            .returning('*') !== undefined;
    }

    async getByLogin(login){
        return await this.user.query()
            .where('login', '=', login)
    }

    async changePassword(login, newpass){
        return await this.user
            .query()
            .patch({password: newpass})
            .where("login", "=", login)
            .returning('*') !== undefined;
    }
}
