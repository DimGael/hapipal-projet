'use strict';

const Joi = require('joi');

module.exports = {
    method: 'DELETE',
    path: '/user/{id}',
    options: {
        handler: async (request, h) => {
            const { User } = request.models()

            let values = await User.query()
                .deleteById(request.payload.id)
                .returning('*')

            if(values == undefined){
                return h.response(
                        {
                            "statusCode": 404,
                            "error": "User not found",
                            "message": "User with id = "+request.payload.id+" doesn't seem to exist"
                        })
                    .code(404)
            }
            
            return h.response(values).code(204)
        },

        tags:[
            'api'
        ],

        validate: {
            payload: Joi.object({
                id: Joi.number().integer().required().min(1)
            })
        }
    }
};
