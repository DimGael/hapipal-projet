'use strict';

const Joi = require('joi');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

module.exports = {
    method: 'POST',
    path: '/user',
    options: {
        handler: async (request, h) => {
            const { userService, mailService } = request.services()

            await userService.add(request.payload)

              // Envoi d'email de bienvenue
            mailService.sendNewAccount(
                request.payload.email,
                request.payload.firstname + ' ' + request.payload.lastname,
                request.payload.login,
                request.payload.password
            )
            
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
