import {sequelize,DataTypes} from '../../../config/DB.config'
import feedbackModel from './feedback.mdl';
import userModel from '../../user.mdl';


const feedback_commentModel =   sequelize.define('feedback_comment',{
    id:{
        field:'feedback_comment_id',
        type:DataTypes.STRING,
        primaryKey:true,
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
    feedback_id: {
      type: DataTypes.STRING,
      references: {
              model: feedbackModel,
              key: 'feedback_id',
          },
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
      tableName: 'feedback_comment',
      freezeTableName: true
    });

export  default feedback_commentModel;