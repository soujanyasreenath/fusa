"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("search_products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_id: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      color: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.DECIMAL
      },
      material: {
        type: DataTypes.STRING
      },
      occasion: {
        type: DataTypes.STRING
      },
      product_type: {
        type: DataTypes.STRING
      },
      dimension: {
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
    migration.dropTable("search_products").done(done);
  }
};