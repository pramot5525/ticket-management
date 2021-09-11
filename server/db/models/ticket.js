const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [0, 255],
          msg: 'Max length 255 characters',
        },
      },
    },
    description: DataTypes.TEXT,
    contact_information: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false,
        len: {
          args: [0, 255],
          msg: 'Max length 255 characters',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['pending', 'accepted', 'resolved', 'rejected']],
          msg: 'Must be a valid type',
        },
      },
    },
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
