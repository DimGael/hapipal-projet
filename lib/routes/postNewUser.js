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
            const { userService } = request.services()

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.ADR_MAIL,
                    pass: process.env.MAIL_PASSWORD,
                }
            });

            await userService.add(request.payload)

            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    // Appears in header & footer of e-mails
                    name: 'HPAL Api - Gaël DIM',
                    link: 'https://mailgen.js/'
                    // Optional product logo
                    // logo: 'https://mailgen.js/img/logo.png'
                }
            });

            var email = {
                body: {
                    name: request.payload.login,
                    intro: 'Welcome to my Hpal project, your account has been created : login : ' + request.payload.login +', password : '+ request.payload.password,
                    action: {
                        instructions: 'Pour accéder au dépot github, cliquez sur ce bouton : ',
                        button: {
                            color: '#22BC66', // Optional action button color
                            text: 'Github Project',
                            link: 'https://github.com/DimGael'
                        }
                    },
                    outro: 'L\'api est en cours de développement, pour l\'instant votre compte ne sert à rien :)'
                }
            };

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: 'Hpal Project <'+process.env.ADR_MAIL+'>', // sender address
                to: request.payload.login + ' <' + request.payload.email+'>', // list of receivers
                subject: 'New account created', // Subject line
                text: mailGenerator.generatePlaintext(email),
                html: mailGenerator.generate(email),
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            
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
