"use strict";

module.exports = function(sequelize, DataTypes) {
  var search_sale = sequelize.define("search_sale", {
    sale_id: DataTypes.INTEGER,
    product_type: DataTypes.STRING,
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

  return search_sale;
};
