'use strict';

const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/user',
    options: {
        handler: async (request, h) => {
            const { User } = request.models()

            let data_newUser = {};
            data_newUser = request.payload;
            data_newUser.created_at = new Date();

            await User.query()
                .insert(data_newUser)
            
            return h.response().code(201)
        },

        tags:[
            'api'
        ],

        validate: {
            payload: Joi.object({
                login: Joi.string().required(),
                password: Joi.string().alphanum().required(),
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                email: Joi.string().email().required(),
                company: Joi.string(),
                function: Joi.string()
            })
        }
    }
};
