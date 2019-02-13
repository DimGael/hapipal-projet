'use strict';

const Joi = require('joi'),
    Boom = require('boom'),
    faker = require('faker');

module.exports = {
    method: 'GET',
    path: '/users/generate',
    options: {        
        handler: async (request, h) => {
            var result = [];

            for(let i=0; i<100; i++){
                let user = {};

                user.firstName = faker.name.firstName()
                user.lastName = faker.name.lastName()
                user.email = faker.internet.email()
                user.company = faker.company.companyName()
                user.function = faker.name.jobTitle()
                user.login = faker.internet.userName()
                user.password = faker.internet.password()

                result.push(user);
            }

            return h.response(result).code(200);
        },

        tags:[
            'api'
        ]
    }
};
