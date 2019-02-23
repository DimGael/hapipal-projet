'use strict';

const Joi = require('joi'),
Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { userService } = request.services()

            var user = await userService.getById(request.params.id);
            if (user.length === 0){
                return Boom.notFound('L\'utilisateur avec id = ' + request.params.id + ' n\'existe pas.')
            }
            else {
                return h.response(user[0]).code(200);
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
