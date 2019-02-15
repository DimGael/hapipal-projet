'use strict';

const Joi = require('joi'),
Boom = require('boom');

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
                return Boom.notFound('L\'utilisateur avec id = ' + request.payload.id + ' n\'existe pas.')
            }
            
            return h.response().code(201)
        },

        tags:[
            'api'
        ],

        validate: {
            payload: Joi.object({
                login: Joi.string(),
                password: Joi.string().alphanum(),
                email: Joi.string().email(),
                firstname: Joi.string(),
                lastname: Joi.string(),
                company: Joi.string(),
                function: Joi.string()
            }),

            params: Joi.object({
                id: Joi.number().integer().required().min(1),
            })
        }
    }
};
