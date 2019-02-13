'use strict';

const { Model } = require('objection');
const Joi = require('joi');
const Password = require('objection-password')();

module.exports = class User extends Password(Model) {

    static get tableName() {
        return 'users';
    }

    static get joiSchema() {
        return Joi.object();
    }

    static get jsonSchema () {
        return {
          type: 'object',
          required: ['firstname', 'lastname', 'login', 'password', 'email'],
    
          properties: {
            id: {type: 'integer'},

            login: {type:'string', minLength:1, maxLength:255},
            password : {type:'string', minLength:1, maxLength:255},

            firstname: {type: 'string', minLength: 1, maxLength: 255},
            lastname: {type: 'string', minLength: 1, maxLength: 255},

            email: {type: 'string', minLength: 1, maxLength: 255},
            company: {type: 'string', minLength: 1, maxLength: 255},
            function: {type: 'string', minLength: 1, maxLength: 255},
          }
        }
    }

};
