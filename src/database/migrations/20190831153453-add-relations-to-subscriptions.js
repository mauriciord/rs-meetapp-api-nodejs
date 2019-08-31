module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('subscriptions', 'meetup_id', {
        type: Sequelize.INTEGER,
        references: { model: 'meetups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      }),
      await queryInterface.addColumn('subscriptions', 'user_id', {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      }),
    ];
  },

  down: async queryInterface => {
    return [
      await queryInterface.removeColumn('subscriptions', 'meetup_id'),
      await queryInterface.removeColumn('subscriptions', 'user_id'),
    ];
  },
};
