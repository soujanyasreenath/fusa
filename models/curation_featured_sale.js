"use strict";

module.exports = function(sequelize, DataTypes) {
  var curation_featured_sale = sequelize.define("curation_featured_sale", {
    tag_id: DataTypes.INTEGER,
    sale_id: DataTypes.INTEGER,
    sale_position: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return curation_featured_sale;
};
