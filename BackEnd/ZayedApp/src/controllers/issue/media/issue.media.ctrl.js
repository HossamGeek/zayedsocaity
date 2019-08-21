import issue_mediaModel from '../../../models/issue/issue_media.mdl';
import ViewService from '../../../services/view.service';
import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import { configErrMsg } from '../../helper/err.config.hlp';

const viewService = new ViewService(issue_mediaModel);
const createService = new CreateService(issue_mediaModel);
const removeService = new RemoveService(issue_mediaModel);


export const issueMediaService ={
    create : (bdy)=>  createService.create(bdy),
    forceRemove : (id)=>  removeService.forceRemove(id),
}

const issueMediaCtrl = {
    createIssueMedia : (req,res)=>{
        issueMediaService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    }
}


export default issueMediaCtrl;