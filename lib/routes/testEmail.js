'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/emailto/{email}',
    options: {
        handler: async (request, h) => {
            const { mailService } = request.services()

            mailService.testMailTo(request.params.email);
            
            return h.response().code(201)
        },

        tags:[
            'api'
        ],

        validate: {
            params: Joi.object({
                email: Joi.string().email().required()
            })
        }
    }
};
