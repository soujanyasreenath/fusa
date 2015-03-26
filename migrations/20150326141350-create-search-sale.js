"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("search_sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sale_id: {
        type: DataTypes.INTEGER
      },
      product_type: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      path: {
        type: DataTypes.STRING
      },
      delivery_type: {
        type: DataTypes.STRING
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
    migration.dropTable("search_sales").done(done);
  }
};