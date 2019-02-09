'use strict';

const Joi = require('joi'),
Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { User } = request.models();
            const users = await User.query()
                .where('id', '=', request.params.id);


            const result = {};
            if (users.length === 0){
                return Boom.notFound('L\'utilisateur avec id = ' + request.params.id + ' n\'existe pas.')
            }
            else {

                result.users = [];
                result.users.push(users);

                return h.response(result).code(200);
            }
        },

        tags:[
            'api'
        ],

        validate: {
            params:{
                id: Joi.number().integer().min(1).required()
            }
        }
    }
};
