import {sequelize,DataTypes} from '../../config/DB.config'
const reportModel =   sequelize.define('report',{
    id:{
        field:'report_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    report_name:{
        field:'report_name',
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
      tableName: 'report',
      freezeTableName: true
    });

export  default reportModel;