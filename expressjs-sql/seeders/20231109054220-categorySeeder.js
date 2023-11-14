'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories',
      [{
          name: 'Phone',
          description: 'Semua Smartphone dan Perlengkapan HP',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Laptop',
          description: 'Semua Laptop dan Perlengkapan Laptop',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Elektronik',
          description: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};