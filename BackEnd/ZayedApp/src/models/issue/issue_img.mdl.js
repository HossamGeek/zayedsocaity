import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from './issue.mdl';

const issue_imgModel =   sequelize.define('issue_img',{
    id:{
        field:'issue_img_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    issue_img_name:{
        field:'issue_img_name',
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
    issue_id: {
      type: DataTypes.STRING,
      references: {
              model: issueModel,
              key: 'issue_id',
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
      tableName: 'issue_img',
      freezeTableName: true
    });

export  default issue_imgModel;