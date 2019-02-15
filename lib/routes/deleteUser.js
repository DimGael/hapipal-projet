'use strict';

const Joi = require('joi'),
    Boom = require('boom');

module.exports = {
    method: 'DELETE',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { User } = request.models()

            let values = await User.query()
                .deleteById(request.params.id)
                .returning('*')

            if(values == undefined){
                return Boom.notFound('L\'utilisateur avec id = ' + request.params.id + ' n\'existe pas.')
            }
            
            return h.response(values).code(204)
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
