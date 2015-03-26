"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("curation_tags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tag_id: {
        type: DataTypes.INTEGER
      },
      parent_tag_id: {
        type: DataTypes.INTEGER
      },
      tag_position: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("curation_tags").done(done);
  }
};