const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        name: 'Александр Иванов',
        hashpass: await bcrypt.hash("123", 10)
      },
      {
        email: 'moderator@example.com',
        name: 'Мария Петрова',
        hashpass: await bcrypt.hash("123", 10)
      }], {})


        await queryInterface.bulkInsert('Orders', [
      {
        company: 'Газпром',
        phone: '77777777',
         userId: 1
      },
      {
        company: 'Сбер',
        phone: '989898989',
          userId: 2
      }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
