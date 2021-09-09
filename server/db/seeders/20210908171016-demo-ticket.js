module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Tickets', [{
    title: 'Todo',
    description: 'testsssss',
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
