import {sequelize,DataTypes} from '../../../config/DB.config';
import evaluationModel from './evaluation.mdl';

const user_evaluationModel =   sequelize.define('user_evaluation',{
    id:{
        field:'user_evaluation_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    description:{
        field:'description',
        type:DataTypes.STRING,
    },
    mac_address:{
      field:'mac_address',
      type:DataTypes.STRING,
      unique:true
  },
    evaluation_id: {
      type: DataTypes.STRING,
      references: {
              model: evaluationModel,
              key: 'evaluation_id',
          },
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
      tableName: 'user_evaluation',
      freezeTableName: true
    });

export  default user_evaluationModel;