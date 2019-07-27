import {sequelize,DataTypes} from '../../config/DB.config'
const roleModel =   sequelize.define('role',{
    id:{
        field:'role_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    role_name:{
        field:'role_name',
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
      tableName: 'role',
      freezeTableName: true
    });

export  default roleModel;