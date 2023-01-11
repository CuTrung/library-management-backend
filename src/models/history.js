'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    studentId: DataTypes.STRING,
    bookId: DataTypes.STRING,
    quantityBorrowed: DataTypes.STRING,
    timeStart: DataTypes.STRING,
    timeEnd: DataTypes.STRING,
    isReturned: DataTypes.INTEGER,
    isConfirmed: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'History',
    freezeTableName: true,
  });
  return History;
};