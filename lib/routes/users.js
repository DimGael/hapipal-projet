'use strict';

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        handler: (request, h) => {
            return h.response({ message : 'success' });
        },
        tags:[
            'api'
        ]
    }
};
