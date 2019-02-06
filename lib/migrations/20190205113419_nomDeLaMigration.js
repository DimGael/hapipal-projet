
exports.up = function(knex, Promise) {
    knex.schema.hasTable('users').then((exists) => {
        if (!exists){
            return knex.schema.createTable('users', (table) => {
                table.increments();

                table.string('login');
                table.string('password');
                table.string('email');
                table.string('firstname');
                table.string('lastname');
                table.string('company');
                table.string('function');

                table.timestamps();
            });
        }
    });



};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
