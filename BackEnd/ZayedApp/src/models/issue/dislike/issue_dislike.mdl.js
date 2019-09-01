import {sequelize,DataTypes} from '../../../../config/DB.config'
import issueModel from '../issue.mdl';
import userModel from '../../user.mdl';
import reportModel from '../../report.mdl';


const issue_dislikeModel =   sequelize.define('issue_dislike',{
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
    report_id: {
      type: DataTypes.UUID,
      references: {
              model: reportModel,
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
      tableName: 'issue_dislike',
      freezeTableName: true
    });

   


export  default issue_dislikeModel;