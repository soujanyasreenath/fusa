"use strict";

module.exports = function(sequelize, DataTypes) {
  var curation_tag = sequelize.define("curation_tag", {
    tag_id: DataTypes.INTEGER,
    parent_tag_id: DataTypes.INTEGER,
    tag_position: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return curation_tag;
};
