import issueModel from '../../models/issue/issue.mdl';
import RemoveService from '../../services/remove.service';
import CreateService from '../../services/create.service';
import ViewService from '../../services/view.service';
import { configErrMsg } from '../helper/err.config.hlp';
import {configResultData} from "../helper/view.hlp";


const viewService = new ViewService(issueModel);
const createService = new CreateService(issueModel);
const removeService = new RemoveService(issueModel);

export const issueService = {
    create : (bdy) => createService.create(bdy),
    findAll:(Where = {}) => viewService.findAll(Where),
    sort:(Where,include,limit,sort) => viewService.sort(Where,include,limit,sort),
    forceRemove : (id) =>  removeService.forceRemove(id)
    
}

const issueCtrl = {
    create : (req,res)=>{
        issueService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        viewService.findAll(req.headers)
        .then(result=>res.json(configResultData(result)))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueCtrl;
