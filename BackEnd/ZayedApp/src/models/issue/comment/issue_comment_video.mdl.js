import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from '../issue.mdl';
import issue_commentModel from './issue_comment.mdl';
import userModel from '../../user.mdl';

const issue_comment_videoModel =   sequelize.define('issue_comment_video',{
    id:{
        field:'issue_comment_video_id',
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true
    },
    issue_comment_video_name:{
        field:'issue_comment_video_name',
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
    issue_comment_id: {
      type: DataTypes.STRING,
      references: {
              model: issue_commentModel,
              key: 'issue_comment_id',
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
      tableName: 'issue_comment_video',
      freezeTableName: true
    });

export  default issue_comment_videoModel;