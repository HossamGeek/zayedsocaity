import {sequelize,DataTypes} from '../../../config/DB.config'
import issueModel from '../issue.mdl';
import userModel from '../../user.mdl';
import reportModel from '../../report.mdl';


const issue_dislikeModel =   sequelize.define('issue_dislike',{
    id:{
        field:'issue_dislike_id',
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
    report_id: {
      type: DataTypes.STRING,
      references: {
              model: reportModel,
              key: 'report_id',
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
      tableName: 'issue_dislike',
      freezeTableName: true
    });

export  default issue_dislikeModel;