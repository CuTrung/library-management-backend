'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Status, { foreignKey: 'statusId' });
      Book.belongsToMany(models.Category, { through: 'Book_Category', foreignKey: 'bookId' });
    }
  }
  Book.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    borrowed: DataTypes.STRING,
    quantity: DataTypes.STRING,
    statusId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Book',
    freezeTableName: true,
  });
  return Book;
};