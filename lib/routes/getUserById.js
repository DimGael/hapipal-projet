'use strict';

const Joi = require('joi');

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
                return h.response(
                    {
                        "statusCode": 404,
                        "error": "User not found",
                        "message": "User with id = "+request.params.id+" doesn't seem to exist"
                    }
                ).code(404);
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
