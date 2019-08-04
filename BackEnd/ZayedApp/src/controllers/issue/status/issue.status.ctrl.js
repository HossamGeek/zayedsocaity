import issue_statusModel from '../../../models/issue/status/issue_status.mdl';
import {findByService} from '../../../services/view.service';
import { configErrMsg } from '../../helper/err.config.hlp';
import createService from '../../../services/create.service';
import {configResultData} from "../../helper/view.hlp";
import {forceRemoveService} from '../../../services/remove.service';


export const issueStatusService = {
    createIssueStatusService : (bdy) => createService(issue_statusModel,bdy),
    forceRemoveIssueStatus : (id) => forceRemoveService(issue_statusModel,id),

}

const issueStatusCtrl = {
    create : (req,res)=>{
        issueStatusService.createIssueStatusService(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        findByService(issue_statusModel,req.headers)
        .then(result=>res.json(configResultData(result)))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueStatusCtrl;
