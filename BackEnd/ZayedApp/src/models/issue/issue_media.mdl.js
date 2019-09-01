import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from './issue.mdl';
import galleryModel from '../gallery.mdl';
import userModel from '../user.mdl';

const issue_mediaModel =   sequelize.define('issue_media',{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
      type: DataTypes.UUID,
      references: {
              model: issueModel,
              key: 'id',
          },
    }, 
    user_id: {
      type: DataTypes.UUID,
      references: {
              model: userModel,
              key: 'id',
          },
    }, 
    gallery_id: {
      type: DataTypes.UUID,
      references: {
              model: galleryModel,
              key: 'id',
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

   issue_mediaModel.belongsTo(userModel,
    { foreignKey: 'user_id',targetKey: 'id',sourceKey:'user_id',
    constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });
    issue_mediaModel.belongsTo(galleryModel,
      { foreignKey: 'gallery_id',targetKey: 'id',sourceKey:'gallery_id',
      constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });

export  default issue_mediaModel;