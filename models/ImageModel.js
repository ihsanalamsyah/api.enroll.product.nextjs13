import Sequelize from "sequelize";

import db from '../config/Database.js';

import Products from '../models/ProductModel.js';
const { DataTypes } = Sequelize;


const Image = db.define('Images', {
    image_blob: DataTypes.BLOB('long'),
    product_id: DataTypes.INTEGER,
    content_type: DataTypes.STRING
}, {
    freezeTableName: true
})


Image.belongsTo(Products, { 
  foreignKey: 'product_id', 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});

Products.hasOne(Image, { 
  foreignKey: 'product_id' 
});

export default Image;

(async()=>{
  await db.sync();
})();