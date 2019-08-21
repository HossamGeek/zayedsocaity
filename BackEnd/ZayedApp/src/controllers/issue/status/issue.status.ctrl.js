import issue_statusModel from '../../../models/issue/status/issue_status.mdl';

import { configErrMsg } from '../../helper/err.config.hlp';

import {configResultData} from "../../helper/view.hlp";

import ViewService from '../../services/view.service';
import CreateService from '../../services/create.service';
import RemoveService from '../../services/remove.service';

const viewService = new ViewService(issueModel);
const createService = new CreateService(issueModel);
const removeService = new RemoveService(issueModel);


export const issueStatusService = {
    create : (bdy) => createService.create(bdy),
    forceRemove : (id) => removeService.forceRemove(id),

}

const issueStatusCtrl = {
    create : (req,res)=>{
        issueStatusService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        viewService.findBy(req.headers)
        .then(result=>res.json(configResultData(result)))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueStatusCtrl;
