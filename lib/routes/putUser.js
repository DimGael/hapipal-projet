'use strict';

const Joi = require('joi'),
Boom = require('boom');

module.exports = {
    method: 'PUT',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { userService } = request.services()

            if (!userService.update(request.params.id, request.payload)){
                return Boom.notFound('L\'utilisateur avec id = ' + request.params.id + ' n\'existe pas.')
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
