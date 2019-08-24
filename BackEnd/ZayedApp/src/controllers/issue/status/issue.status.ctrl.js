import issue_statusModel from '../../../models/issue/status/issue_status.mdl';
import { configErrMsg } from '../../helper/err.config.hlp';
import {configResultData} from "../../helper/view.hlp";
import ViewService from '../../../services/view.service';
import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import issueModel from '../../../models/issue/issue.mdl';

const viewService = new ViewService(issue_statusModel);
const createService = new CreateService(issue_statusModel);
const removeService = new RemoveService(issue_statusModel);


export const issueStatusService = {
    create : (bdy) =>  createService.create(bdy),
    forceRemove : (id) =>  removeService.forceRemove(id),

}

const issueStatusCtrl = {
    create : (req,res)=>{
        issueStatusService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        viewService.sort({},[{model:issueModel}])
        .then(result=>res.json(configResultData(result)))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueStatusCtrl;
