import issueModel from '../../models/issue/issue.mdl';
import {findByService} from '../../services/view.service';
import { configErrMsg } from '../helper/err.config.hlp';
import createService from '../../services/create.service';
import {configResultData} from "../helper/view.hlp";
import {forceRemoveService} from '../../services/remove.service';


export const issueService = {
    createIssueService : (bdy) => createService(issueModel,bdy),
    forceRemoveIssue : (id) => forceRemoveService(issueModel,id),

}

const issueCtrl = {
    create : (req,res)=>{
        issueService.createIssueService(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        findByService(issueModel,req.headers)
        .then(result=>res.json(configResultData(result)))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueCtrl;
