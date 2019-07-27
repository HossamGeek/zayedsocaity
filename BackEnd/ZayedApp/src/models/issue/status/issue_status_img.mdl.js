import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from '../issue.mdl';
import issue_statusModel from './issue_status.mdl';
import userModel from '../../user.mdl';

const issue_status_imgModel =   sequelize.define('issue_status_img',{
    id:{
        field:'issue_status_img_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    issue_status_img_name:{
        field:'issue_status_img_name',
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
    issue_status_id: {
      type: DataTypes.STRING,
      references: {
              model: issue_statusModel,
              key: 'issue_status_id',
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
      tableName: 'issue_status_img',
      freezeTableName: true
    });

export  default issue_status_imgModel;