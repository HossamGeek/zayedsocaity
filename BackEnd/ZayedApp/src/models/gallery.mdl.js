import {sequelize,DataTypes} from '../../config/DB.config';
import userModel from './user.mdl';

const galleryModel =   sequelize.define('role',{
    id:{
        field:'gallery_id',
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique:true
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
              model: userModel,
              key: 'user_id',
          },
    }, 
    mime_type:{
        field:'mime_type',
        type:DataTypes.STRING, 
    },
    location:{
      field:'location',
      type:DataTypes.STRING,
      unique:true
   },
    is_in_active:{
        field:'is_in_active',
        type:DataTypes.BOOLEAN,
        allowNull: false,
         defaultValue: false 
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
      tableName: 'gallery',
      freezeTableName: true
    });

export  default galleryModel;