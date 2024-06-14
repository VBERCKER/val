import { DataTypes } from '@sequelize/core';
import { sequelize } from '../config/db.config.js';


/***definition du modelèe des offres */

export const Offre = sequelize.define('offre',{

           id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                unique :true,
                },

          offre: {
            type: DataTypes.STRING(25),
            allowNull: false
            
          },
          Place_offre: {
            type: DataTypes.INTEGER(10),
            allowNull: false
           
          },
          Prix_offre: {
            type: DataTypes.INTEGER(10),
            allowNull: false
            
          }, 
           Places_dispo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{isEmail : true}
            
          }, 
          SPORT_ID: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            
          }
},{
    freezeTableName:true,
    paranoid:true // sofdelete
});


console.log('Offrer === sequelize.models.offre', Offre === sequelize.models.offre)

Offre.sync()