import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from '../issue.mdl';
import userModel from '../../user.mdl';


const issue_commentModel =   sequelize.define('issue_comment',{
    id:{
        field:'issue_comment_id',
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
              key: 'issue_id',
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
      tableName: 'issue_comment',
      freezeTableName: true
    });

export  default issue_commentModel;