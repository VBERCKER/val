import { DataTypes } from '@sequelize/core';
import { sequelize } from '../config/db.config.js';


/***definition du modelèe utilisateur */

export const User = sequelize.define('user',{

          id:{
              type: DataTypes.INTEGER,
              primaryKey:true,
              autoIncrement:true,
              unique :true,
          },

          nom: {
            type: DataTypes.STRING(50),
            allowNull: false
            
          },
          prenom: {
            type: DataTypes.STRING(50),
            allowNull: false
           
          },
          nom_utilisateur: {
            type: DataTypes.STRING(101),
            allowNull: false
            
          }, 
           mail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{isEmail : true}
            
          }, 
          pwd: {
            type: DataTypes.STRING,
            allowNull: false,
            is : /^[0-9a-f]$/i  //contraitne pour le pwd 
            
          },
          cles_utilisateur: {
            type: DataTypes.STRING,
            allowNull: false
           
          },
          role: {
            type: DataTypes.STRING,
            allowNull: false
            
          }, 
},{
    freezeTableName:true,
    paranoid:true // sofdelete
});


console.log('User === sequelize.models.utilisateur', User === sequelize.models.utilisateur)

User.sync()