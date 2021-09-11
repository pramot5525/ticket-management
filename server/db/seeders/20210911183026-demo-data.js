module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Tickets', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
