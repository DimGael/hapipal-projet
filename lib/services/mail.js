'use strict';

const { Service }        = require('schmervice');

const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


module.exports = class MailService extends Service {


    async initialize(){ // CALLED ON SERVER INITIALIZATION (onPreStart)
        require('dotenv').config();

        this.transporter = nodemailer.createTransport({
            service: process.env.NODEMAILER_SERVICE,
            auth: {
                user: process.env.ADR_MAIL,
                pass: process.env.MAIL_PASSWORD,
            }
        });


        this.mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'HPAL Api - Gaël DIM',
                link: 'https://mailgen.js/'
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            }
        });
    }

    async teardown(){ // CALLED ON SERVER STOP (OnPostStop)

        // tear down stuff here
    }

    testMailTo(emailAdress){ //Sends test mail
        var email = {
            body: {
                name: 'Test buddy',
                intro: 'Bienvenue dans mon projet HAPI PAL. Ceci est un mail pour tester le fonctionnement des mails',
                action: {
                    instructions: 'Pour accéder au dépot github du projet, cliquez sur ce bouton : ',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Github Project',
                        link: 'https://github.com/DimGael'
                    }
                },
                outro: 'L\'api est en cours de développement.'
            }
        };

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'Hpal Project <'+process.env.ADR_MAIL+'>', // sender address
            to: 'Test buddy' + ' <' + emailAdress+'>', // list of receivers
            subject: 'Email for testing', // Subject line
            text: this.mailGenerator.generatePlaintext(email),
            html: this.mailGenerator.generate(email),
        };

        this.sendMail(mailOptions);
    }

    sendNewAccount(emailAdress, name, login, password){
        var email = {
            body: {
                name: name,
                intro: 'Bienvenue dans l\'API HAPI PAL. Votre compte a été créé !\nLogin: '+login+', Password: '+password,
                action: {
                    instructions: 'Pour accéder au dépot github du projet, cliquez sur ce bouton : ',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Github Project',
                        link: 'https://github.com/DimGael'
                    }
                },
                outro: 'L\'api est en cours de développement. Pour l\'instant votre compte ne sert pas à grand chose :)'
            }
        };

        var mailOptions = {
            from: 'Hpal Project <'+process.env.ADR_MAIL+'>', // sender address
            to: name + ' <' + emailAdress+'>', // list of receivers
            subject: 'HapiPal - New account created', // Subject line
            text: this.mailGenerator.generatePlaintext(email),
            html: this.mailGenerator.generate(email),
        };

        this.sendMail(mailOptions);
    }

    sendUpdatedAccount(emailAdress, name){
        var email = {
            body: {
                name: name,
                intro: 'Votre compte a bien été mis à jour !',
                action: {
                    instructions: 'Ce n\'est pas vous ? Cliquer ici pour annuler les modifications. (ça marche pas ça va vous amener sur le dépôt GitHub)',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Annulaient (dépôt Github)',
                        link: 'https://github.com/DimGael'
                    }
                },
                outro: 'L\'api est en cours de développement. Pour l\'instant votre compte ne sert pas à grand chose :)'
            }
        };

        var mailOptions = {
            from: 'Hpal Project <'+process.env.ADR_MAIL+'>', // sender address
            to: name + ' <' + emailAdress+'>', // list of receivers
            subject: 'HapiPal - Account updated', // Subject line
            text: this.mailGenerator.generatePlaintext(email),
            html: this.mailGenerator.generate(email),
        };

        this.sendMail(mailOptions);
    }

    sendMail(mailOptions){
        // send mail with defined transport object
        this.transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.error(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
}