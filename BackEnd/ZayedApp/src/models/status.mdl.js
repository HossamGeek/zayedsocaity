import {sequelize,DataTypes} from '../../config/DB.config'
const statusModel =   sequelize.define('status',{
    id:{
        field:'status_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    status_name:{
        field:'status_name',
        type:DataTypes.STRING,
        unique:true
    },
    status_num:{
      field:'status_num',
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
      tableName: 'status',
      freezeTableName: true
    });

export  default statusModel;