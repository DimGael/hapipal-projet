'use strict';

const Joi = require('joi'),
Boom = require('boom');

module.exports = {
    method: 'POST',
    path: '/auth',
    options: {
        handler: async (request, h) => {
            const { userService } = request.services()

            var user = await userService.getByLogin(request.payload.login)
            user = user[0];

            if (!user)
                return Boom.notFound("L'utilisateur " + request.payload.login + " n'a pas été trouvé.")

            if (await user.verifyPassword(request.payload.password))
                return h.response({msg : 'ok'}).code(200)
            else
                return h.response({msg : 'ko'}).code(403)
        },

        tags:[
            'api'
        ],

        validate: {
            payload: Joi.object({
                login: Joi.string().required(),
                password: Joi.string().alphanum().required(),
            })
        }
    }
};
