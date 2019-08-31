module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('meetups', 'file_id', {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      }),
      await queryInterface.addColumn('meetups', 'user_id', {
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
      await queryInterface.removeColumn('meetups', 'file_id'),
      await queryInterface.removeColumn('meetups', 'user_id'),
    ];
  },
};
