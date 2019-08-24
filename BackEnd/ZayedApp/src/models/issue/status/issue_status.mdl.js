import {sequelize,DataTypes} from '../../../../config/DB.config';
import issueModel from '../issue.mdl';
import userModel from '../../user.mdl';
import statusModel from '../../status.mdl';


const issue_statusModel =   sequelize.define('issue_status',{
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
    status_id: {
      type: DataTypes.UUID,
      references: {
              model: statusModel,
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
      tableName: 'issue_status',
      freezeTableName: true
    });

    issue_statusModel.belongsTo(userModel,
      { foreignKey: 'user_id',targetKey: 'id',sourceKey:'user_id',constraints: false});
    issue_statusModel.belongsTo(statusModel,
      { foreignKey: 'status_id',targetKey: 'id',sourceKey:'status_id',constraints: false});

export  default issue_statusModel;