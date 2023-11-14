'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSaltSync(10);
    const adminId = await queryInterface.rawSelect('Roles', {
      where: { name: 'admin' }
    }, ['id']);

    return queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      name: 'Admin',
      email: 'admin@email.com',
      role_id: adminId,
      password: bcrypt.hashSync('password', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};