'use strict';

const Joi = require('joi'),
    Boom = require('boom');

module.exports = {
    method: 'DELETE',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { userService } = request.services()

            if (!await userService.delete(request.params.id)){
                return Boom.notFound('L\'utilisateur avec id = ' + request.params.id + ' n\'existe pas.')
            }
            
            return h.response().code(204)
        },

        tags:[
            'api'
        ],

        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().min(1)
            })
        }
    }
};
