import issue_likeModel from "../../../models/issue/like/issue_like.mdl";
import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import {issueDisLikeService} from "../dislike/issue_dislike.ctrl";
import ViewService from '../../../services/view.service';


const createService = new CreateService(issue_likeModel);
const removeService = new RemoveService(issue_likeModel);
const viewService = new ViewService(issue_likeModel);

export const issueLikeService = {
    push : (bdy)=>createService.create(bdy),
    pull : (id)=>removeService.forceRemove(id),
    find : (Where) => viewService.findAll(Where)
}


const issueLikeCtrl = {
    pushUser :  (req,res) => {
        issueDisLikeService.pull({user_id:req.headers['user_id']});
        issueLikeService.push(req.headers)
            .then(result=> res.json({data:result,success:true}))
            .catch(err=>res.json({data:"transaction failed",success:false,err}))
    },
    pullUser :  (req,res) => {
        issueLikeService.pull(req.headers)
            .then(result=> result ? res.json({data:'user like pull',success:true})
                                  : issueLikeCtrl.pushUser(req,res))
            .catch(err=>res.json({data:"transaction failed",success:false,err}))
    },
    find : (req,res)=>{
        let headers = {},issue_id = req.headers['issue_id'];
        headers =  issue_id && issue_id.length ? {issue_id} : {};
        issueLikeService.find(headers)
        .then(result=> result.length ? res.json({data:result,success:true}): 
        res.json({data:'no found data',success:false}))
        .catch(err=>res.json({data:"transaction failed",success:false,err}))
    }

}

export default issueLikeCtrl;
