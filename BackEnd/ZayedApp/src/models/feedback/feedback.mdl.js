import {sequelize,DataTypes} from '../../../config/DB.config';
import userModel from '../user.mdl';


const feedbackModel =   sequelize.define('feedback',{
    id:{
        field:'feedback_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    feedback_name:{
        field:'feedback_name',
        type:DataTypes.STRING,
        unique:true
    },
    description:{
      field:'description',
      type:DataTypes.STRING,
    },
    is_in_active:{
        field:'is_in_active',
        type:DataTypes.BOOLEAN,
        allowNull: false,
         defaultValue: false 
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
              model: userModel,
        
              key: 'user_id',
          },
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
      tableName: 'feedback',
      freezeTableName: true
    });

export  default feedbackModel;