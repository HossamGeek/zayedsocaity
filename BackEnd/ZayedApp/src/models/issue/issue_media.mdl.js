import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from './issue.mdl';
import galleryModel from '../gallery.mdl';
import userModel from '../user.mdl';

const issue_mediaModel =   sequelize.define('issue_media',{
    id:{
        field:'issue_media_id',
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
    user_id: {
      type: DataTypes.STRING,
      references: {
              model: userModel,
              key: 'user_id',
          },
    }, 
    gallery_id: {
      type: DataTypes.STRING,
      references: {
              model: galleryModel,
              key: 'gallery_id',
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
      tableName: 'issue_media',
      freezeTableName: true
    });

export  default issue_mediaModel;