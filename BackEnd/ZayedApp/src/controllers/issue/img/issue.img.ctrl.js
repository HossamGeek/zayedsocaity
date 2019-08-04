import issue_imgModel from '../../../models/issue/issue_img.mdl';
import createService from '../../../services/create.service';
import {forceRemoveService} from '../../../services/remove.service'
import { configErrMsg } from '../../helper/err.config.hlp';

export const issueImgService ={
    createImgService : (bdy)=>createService(issue_imgModel,bdy),
    forceRemoveIssueImg : (id)=> forceRemoveService(issue_imgModel,id),

}
const issueImgCtrl = {
    createIssueImg : (req,res)=>{
        issueImgService.createImgService(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    }
}


export default issueImgCtrl;