import issueModel from '../models/issue/issue.mdl';
import {findAllService} from '../services/view.service';
import { configErrMsg } from './helper/err.config.hlp';
import createService from '../services/create.service';


const issueCtrl = {
    createIssueService : (bdy) => createService(issueModel,bdy),
    create : (req,res)=>{
        issueCtrl.createIssueService(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        findAllService(issueModel)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueCtrl;
