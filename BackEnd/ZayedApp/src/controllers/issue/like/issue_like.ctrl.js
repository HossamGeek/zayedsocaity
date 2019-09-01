import issue_likeModel from "../../../models/issue/like/issue_like.mdl";
import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';

const createService = new CreateService(issue_likeModel);
const removeService = new RemoveService(issue_likeModel);

export const issueLikeService = {
    push : (bdy)=>createService.create(bdy),
    pull : (id)=>removeService.forceRemove(id)
    
}


const issueLikeCtrl = {
    pushUser :  (req,res) => {
        issueLikeService.push(req.headers)
            .then(result=> res.json({data:result,success:true}))
            .catch(err=>res.json({data:"transaction failed",success:false,err}))
    },
    pullUser :  (req,res) => {
        issueLikeService.pull(req.headers)
            .then(result=> result ? res.json({data:'user like pull',success:true})
                                  : issueLikeCtrl.pushUser(req,res))
            .catch(err=>res.json({data:"transaction failed",success:false,err}))
    }
}

export default issueLikeCtrl;
