'use strict';

const Joi = require('joi');

module.exports = {
    method: 'PUT',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { User } = request.models();

            let data_newUser = {};
            data_newUser = request.payload;
            data_newUser.updated_at = new Date();

            let values = await User.query()
                .patchAndFetchById(request.payload.id, data_newUser)
                .returning('*')

            if (values === undefined){
                return h.response(
                    {
                        "statusCode": 404,
                        "error": "User not found",
                        "message": "User with id = "+request.payload.id+" doesn't seem to exist"
                    })
                .code(404)
            }
            
            return h.response().code(201)
        },

        tags:[
            'api'
        ],

        validate: {
            payload: Joi.object({
                id: Joi.number().integer().required().min(1),
                login: Joi.string(),
                password: Joi.string().alphanum(),
                email: Joi.string().email(),
                firstname: Joi.string(),
                lastname: Joi.string(),
                company: Joi.string(),
                function: Joi.string()
            })
        }
    }
};
