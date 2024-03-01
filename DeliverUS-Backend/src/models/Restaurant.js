import { Model } from 'sequelize'
import moment from 'moment'

const loadModel = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Restaurant.belongsTo(models.RestaurantCategory, { foreignKey: 'restaurantCategoryId', as: 'restaurantCategory' })
      Restaurant.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Restaurant.hasMany(models.Product, { foreignKey: 'restaurantId', as: 'products' })
      Restaurant.hasMany(models.Order, { foreignKey: 'restaurantId', as: 'orders' })
    }

    async getAverageServiceTime () {
      try {
        const orders = await this.getOrders()
        const serviceTimes = orders.filter(o => o.deliveredAt).map(o => moment(o.deliveredAt).diff(moment(o.createdAt), 'minutes'))
        return serviceTimes.reduce((acc, serviceTime) => acc + serviceTime, 0) / serviceTimes.length
      } catch (err) {
        return err
      }
    }
  }
  Restaurant.init({
    // TODO: Include the rest of the properties of the Restaurant model
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    postalCode: {
      allowNull: false,
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    restaurantCategoryId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DOUBLE
    },
    email: {
      type: DataTypes.STRING
    },
    logo: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    userId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.ENUM,
      values: [
        'online',
        'offline ',
        'closed',
        'temporarily closed'
      ]
    },
    heroImage: {
      type: DataTypes.STRING
    },
    averageServiceMinutes: {
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'Restaurant'
  })
  return Restaurant
}
export default loadModel
