"use strict";

module.exports = function(sequelize, DataTypes) {
  var curation_newin = sequelize.define("curation_newin", {
    tag_id: DataTypes.INTEGER,
    sale_id: DataTypes.INTEGER,
    sale_position: DataTypes.INTEGER,
    tag_position: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return curation_newin;
};
