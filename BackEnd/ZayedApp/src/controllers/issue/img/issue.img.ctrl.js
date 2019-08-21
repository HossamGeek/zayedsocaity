import issue_imgModel from '../../../models/issue/issue_img.mdl';
import ViewService from '../../services/view.service';
import CreateService from '../../services/create.service';
import RemoveService from '../../services/remove.service';
import { configErrMsg } from '../../helper/err.config.hlp';

const viewService = new ViewService(issue_imgModel);
const createService = new CreateService(issue_imgModel);
const removeService = new RemoveService(issue_imgModel);


export const issueImgService ={
    create : (bdy)=>createService.create(bdy),
    forceRemove : (id)=> removeService.forceRemove(issue_imgModel,id),
}

const issueImgCtrl = {
    createIssueImg : (req,res)=>{
        issueImgService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    }
}


export default issueImgCtrl;