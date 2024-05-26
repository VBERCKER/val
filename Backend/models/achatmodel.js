import { DataTypes } from '@sequelize/core';
import { sequelize } from '../config/db.config.js';


/***definition du modelèe utilisateur */

export const Achat = sequelize.define('achat',{



          id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            unique :true,
            },


          offre: {
            type: DataTypes.STRING(50),
            allowNull: false
            
          },
          sport: {
            type: DataTypes.STRING(50),
            allowNull: false
           
          },
          FK_user_id: {
            type: DataTypes.STRING(101),
            allowNull: false
            
          }, 
           Heure: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{isEmail : true}
            
          }, 
          cles_achat: {
            type: DataTypes.STRING,
            allowNull: false,
            is : /^[0-9a-f]$/i  //contraitne pour le pwd 
            
          },
          cles_verif: {
            type: DataTypes.STRING,
            allowNull: false
           
          }
},{
    freezeTableName:true,
    paranoid:true // sofdelete
});


console.log('Achat === sequelize.models.utilisateur', Achat === sequelize.models.achat)

Achat.sync()