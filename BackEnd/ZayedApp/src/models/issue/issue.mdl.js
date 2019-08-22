import {sequelize,DataTypes} from '../../../config/DB.config';
import locationModel from '../location.mdl';
import userModel from '../user.mdl';


const issueModel =   sequelize.define('issue',{
    id:{
        field:'issue_id',
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
      references: {
              model: locationModel,
        
              key: 'location_id',
          },
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
      tableName: 'issue',
      freezeTableName: true
    });

export  default issueModel;