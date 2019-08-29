import {sequelize,DataTypes} from '../../../../config/DB.config';
import issueModel from '../issue.mdl';
import issue_statusModel from './issue_status.mdl';
import userModel from '../../user.mdl';
import galleryModel from '../../gallery.mdl';

const issue_status_mediaModel =   sequelize.define('issue_status_media',{
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
      allowNull: false,
      references: {
              model: issueModel,
              key: 'id',
          },
    }, 
    issue_status_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
              model: issue_statusModel,
              key: 'id',
          },
    }, 
    gallery_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
              model: galleryModel,
              key: 'id',
          },
    }, 
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
              model: userModel,
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
      tableName: 'issue_status_media',
      freezeTableName: true
    });

    
    issue_status_mediaModel.hasMany( issue_statusModel,
      { foreignKey: 'issue_status_id',targetKey: 'id',sourceKey:'issue_status_id',constraints: false});

    issue_status_mediaModel.belongsTo(galleryModel,
      { foreignKey: 'gallery_id',targetKey: 'id',sourceKey:'gallery_id',constraints: false});

    issue_status_mediaModel.hasMany(issueModel ,
        { foreignKey: 'issue_id',targetKey: 'id',sourceKey:'issue_id',constraints: false});
      
    issue_status_mediaModel.hasMany(userModel ,
          { foreignKey: 'user_id',targetKey: 'id',sourceKey:'user_id',constraints: false});
      

export  default issue_status_mediaModel;