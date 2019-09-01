import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import issue_dislikeModel from '../../../models/issue/dislike/issue_dislike.mdl';
import { issueLikeService } from '../like/issue_like.ctrl';



const createService = new CreateService(issue_dislikeModel);
const removeService = new RemoveService(issue_dislikeModel);

export const issueDisLikeService = {
    push : (bdy)=>createService.create(bdy),
    pull : (id)=>removeService.forceRemove(id)
    
}


const issueDisLikeCtrl = {
    pushUser :  (req,res) => {
        issueLikeService.pull({user_id:req.headers['user_id']});
        issueDisLikeService.push(req.headers)
            .then(result=> res.json({data:result,success:true}))
            .catch(err=>res.json({data:"transaction failed",success:false,err}))
    },
    pullUser :  (req,res) => {
        issueDisLikeService.pull(req.headers)
            .then(result=> result ? res.json({data:'user dislike pull',success:true})
                                  : issueDisLikeCtrl.pushUser(req,res))
            .catch(err=>res.json({data:"transaction failed",success:false,err}))
    }
}

export default issueDisLikeCtrl;
