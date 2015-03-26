"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("curation_featured_sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tag_id: {
        type: DataTypes.INTEGER
      },
      sale_id: {
        type: DataTypes.INTEGER
      },
      sale_position: {
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
    migration.dropTable("curation_featured_sales").done(done);
  }
};