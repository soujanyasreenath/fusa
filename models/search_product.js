"use strict";

module.exports = function(sequelize, DataTypes) {
  var search_product = sequelize.define("search_product", {
    product_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    color: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    material: DataTypes.STRING,
    occasion: DataTypes.STRING,
    product_type: DataTypes.STRING,
    dimension: DataTypes.STRING,
    gender: DataTypes.STRING,
    path: DataTypes.STRING,
    delivery_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return search_product;
};
