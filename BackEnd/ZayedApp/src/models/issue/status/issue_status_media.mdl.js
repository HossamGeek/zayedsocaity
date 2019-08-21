import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from '../issue.mdl';
import issue_statusModel from './issue_status.mdl';
import userModel from '../../user.mdl';
import galleryModel from '../../gallery.mdl';

const issue_status_mediaModel =   sequelize.define('issue_status_media',{
    id:{
        field:'issue_status_media_id',
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
    gallery_id: {
      type: DataTypes.STRING,
      references: {
              model: galleryModel,
              key: 'gallery_id',
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
      tableName: 'issue_status_media',
      freezeTableName: true
    });

export  default issue_status_mediaModel;