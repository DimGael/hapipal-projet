'use strict';

const { Model } = require('objection');
const Joi = require('joi');

module.exports = class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get joiSchema() {
        return Joi.object();
    }
};
