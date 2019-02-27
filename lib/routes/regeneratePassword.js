'use strict';

const Joi = require('joi'),
Boom = require('boom');

module.exports = {
    method: 'POST',
    path: '/auth/regenerate',
    options: {
        handler: async (request, h) => {
            const { userService } = request.services()

            var user = await userService.getByLogin(request.payload.login)
            user = user[0];

            if (!user)
                return Boom.notFound("L'utilisateur " + request.payload.login + " n'a pas été trouvé.")

            if (user.verifyPassword(request.payload.oldpassword)){
                if (await userService.changePassword(request.payload.login, request.payload.newpassword)) 
                    return h.response({msg : 'password changed'}).code(200)
            }
            
                return h.response({msg : 'ko'}).code(403)
        },

        tags:[
            'api'
        ],

        validate: {
            payload: Joi.object({
                login: Joi.string().required(),
                oldpassword: Joi.string().alphanum().required(),
                newpassword: Joi.string().alphanum().required(),
            })
        }
    }
};
