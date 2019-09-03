import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import issue_dislikeModel from '../../../models/issue/dislike/issue_dislike.mdl';
import { issueLikeService } from '../like/issue_like.ctrl';
import ViewService from '../../../services/view.service';



const createService = new CreateService(issue_dislikeModel);
const removeService = new RemoveService(issue_dislikeModel);
const viewService = new ViewService(issue_dislikeModel);

export const issueDisLikeService = {
    push : (bdy)=>createService.create(bdy),
    pull : (id)=>removeService.forceRemove(id),
    find : (Where) => viewService.findAll(Where)
}


const  pushToHeaders = (object,headers)=>  {
    Object.keys(object).map(key =>{
        let value = object[key];
        headers =  value && value.length ? {...{[key]:value},...headers} :{...headers};
    })
    return headers;
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
    },
    find : (req,res)=>{
        let headers = {}
        ,issue_id = req.headers['issue_id']
        ,report_id = req.headers['report_id'];
        headers =  pushToHeaders({issue_id,report_id},headers);   
        issueDisLikeService.find(headers)
        .then(result=>result.length ?res.json({data:result,success:true}): 
                                    res.json({data:'no found data',success:false}))
        .catch(err=>res.json({data:"transaction failed",success:false,err}))
    }

}

export default issueDisLikeCtrl;
