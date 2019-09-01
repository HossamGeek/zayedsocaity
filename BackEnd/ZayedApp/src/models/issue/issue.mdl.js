import {sequelize,DataTypes} from '../../../config/DB.config';
import locationModel from '../location.mdl';
import userModel from '../user.mdl';
import issue_statusModel from './status/issue_status.mdl';
import issue_mediaModel from './issue_media.mdl';
import issue_likeModel from './like/issue_like.mdl';
import issue_dislikeModel from './dislike/issue_dislike.mdl';


const issueModel =   sequelize.define('issue',{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique:true
    },
    issue_num:{
      field:'issue_num',
      type:DataTypes.STRING,
      unique:true
    },
    issue_name:{
        field:'issue_name',
        type:DataTypes.STRING,
    },
    description:{
      field:'description',
      type:DataTypes.STRING,
    },
    address:{
      field:'address',
      type:DataTypes.STRING,
    },
    is_in_active:{
        field:'is_in_active',
        type:DataTypes.BOOLEAN,
        allowNull: false,
         defaultValue: false 
    },
    location_id: {
      type: DataTypes.UUID,
      allowNull: false,
        references: {
          model: locationModel,
    
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
      },
       
    }, {
      tableName: 'issue',
      freezeTableName: true,
      
    });

    issueModel.hasMany(issue_dislikeModel, 
      { foreignKey: 'issue_id',
      constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });

    issueModel.hasMany(issue_statusModel, 
      { foreignKey: 'issue_id',as:'issue_status',
      constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });

    issueModel.hasMany(issue_likeModel, 
        { foreignKey: 'issue_id',
        constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });

    issueModel.hasMany(issue_mediaModel,{ foreignKey: 'issue_id',
       constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });

    issueModel.belongsTo(userModel, 
      { foreignKey: 'user_id',targetKey: 'id',sourceKey:'user_id',
      constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });

    issueModel.belongsTo(locationModel,
       { foreignKey: 'location_id' ,targetKey: 'id',sourceKey:'location_id',
       constraints: true, onDelete: 'restrict', onUpdate: 'restrict' });
    

    

export  default issueModel;