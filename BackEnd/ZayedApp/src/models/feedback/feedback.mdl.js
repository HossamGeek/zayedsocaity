import {sequelize,DataTypes} from '../../../config/DB.config';
import userModel from '../user.mdl';


const feedbackModel =   sequelize.define('feedback',{
    id:{
        field:'feedback_id',
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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
      type: DataTypes.UUID,
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