import {sequelize,DataTypes} from '../../config/DB.config';
import locationModel from './location.mdl';
import roleModel from './role.mdl';

const userModel =   sequelize.define('user',{
      id:{
          field:'user_id',
          type:DataTypes.STRING,
          primaryKey:true,
          unique:true
      },
      fname:{
        field:'fname',
        type:DataTypes.STRING,
      },
      lname:{
          field:'lname',
          type:DataTypes.STRING,
      },
      username:{
          field:'username',
          type:DataTypes.STRING,
          unique:true
      },
      email:{
          field:'email',
          type:DataTypes.STRING,
          unique:true
      },
      phone:{
        field:'phone',
        type:DataTypes.STRING,
        unique:true
      },   
      password:{
          field:'password',
          type:DataTypes.STRING,
      },
      mac_address:{
        field:'mac_address',
        type:DataTypes.STRING,
       //unique:true
      },
      is_in_active:{
        field:'is_in_active',
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false 
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      birthday: {
        field:'birthday',
        type: DataTypes.DATE,
        allowNull: false,
      },
      location_id: {
        type: DataTypes.STRING,
        references: {
                model: locationModel,
          
                key: 'location_id',
            },
      }, 
      role_id: {
        type: DataTypes.STRING,
        references: {
                model: roleModel,
          
                key: 'role_id',
            },
      },  
      male:{
        field:'male',
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true 

      },
      approved:{
        field:'approved',
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false 
      } ,
      generate_code: {
        field:'generate_code',
        type: DataTypes.INTEGER,
        allowNull: false,
      },

  }, {
      tableName: 'user',
      freezeTableName: true
    });

export  default userModel;