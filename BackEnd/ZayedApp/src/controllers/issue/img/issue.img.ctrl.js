import issue_imgModel from '../../../models/issue/issue_img.mdl';
import createService from '../../../services/create.service';
import {forceRemoveService} from '../../../services/remove.service'
import { configErrMsg } from '../../helper/err.config.hlp';


const issue_imgCtrl = {
    createImgService : (bdy)=>createService(issue_imgModel,bdy),
    forceRemoveIssueImg : (id)=> forceRemoveService(issue_imgModel,id),
    createIssueImg : (req,res)=>{
        issue_imgCtrl.createImgService(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    }
}


