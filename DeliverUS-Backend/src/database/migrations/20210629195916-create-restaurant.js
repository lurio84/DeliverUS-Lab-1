module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // TODO: Include the rest of the fields of the Restaurants table
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postalCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      restaurantCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'RestaurantCategories'
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      shippingCosts: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      email: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'online',
          'offline ',
          'closed',
          'temporarily closed'
        ]
      },
      heroImage: {
        type: Sequelize.STRING
      },
      averageServiceMinutes: {
        type: Sequelize.DOUBLE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Restaurants')
  }
}
