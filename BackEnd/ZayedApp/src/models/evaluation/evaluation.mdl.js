import {sequelize,DataTypes} from '../../../config/DB.config'
const evaluationModel =   sequelize.define('evaluation',{
    id:{
        field:'evaluation_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    evaluation_name:{
        field:'evaluation_name',
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
      tableName: 'evaluation',
      freezeTableName: true
    });

export  default evaluationModel;