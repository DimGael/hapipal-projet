'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        handler: async (request, h) => {
            const { User } = request.models();
            const users = await User.query();
            const result = {};

            result.lenght = users.length;

            result.users = users;

            return h.response(result).code(200);
        },
        tags:[
            'api'
        ]
    }
};
