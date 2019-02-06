'use strict';

const { Model } = require('objection');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object();
    }
};
