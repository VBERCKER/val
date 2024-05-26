import { DataTypes } from '@sequelize/core';
import { sequelize } from '../config/db.config.js';


/***definition du modelèe utilisateur */

export const Sport = sequelize.define('sport',{

          id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            unique :true,
              },        
         sport: {
            type: DataTypes.STRING(50),
            allowNull: false
            
          },
          sport_img: {
            type: DataTypes.STRING,
            allowNull: false
          }
},{
    freezeTableName:true,
    paranoid:true // sofdelete
});


console.log('Sport === sequelize.models.utilisateur', Sport === sequelize.models.sport)

Sport.sync()