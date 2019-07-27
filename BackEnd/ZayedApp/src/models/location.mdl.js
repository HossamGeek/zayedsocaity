import {sequelize,DataTypes} from '../../config/DB.config';
const locationModel =   sequelize.define('location',{
    id:{
        field:'location_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    location_name:{
        field:'location_name',
        type:DataTypes.STRING,
        unique:true
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
    }
    }, {
      tableName: 'location',
      freezeTableName: true
    });

export  default locationModel;