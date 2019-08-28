import issue_statusModel from '../../../models/issue/status/issue_status.mdl';
import { configErrMsg } from '../../helper/err.config.hlp';
import {configResultData} from "../../helper/view.hlp";
import ViewService from '../../../services/view.service';
import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import issueModel from '../../../models/issue/issue.mdl';
import { issueStatusMediaService } from './issue_status_media.ctrl';


const viewService = new ViewService(issue_statusModel);
const createService = new CreateService(issue_statusModel);
const removeService = new RemoveService(issue_statusModel);

// const mediaUpload = (files)=>
// {
//     //! files have data and must be contain [{id}] 
//     //! then >> push these files data to media data
//     files || files.length ? files.map(file=>{
//         file.id ? mediaFiles.push({
//             issue_id,
//             user_id,
//             gallery_id: file.id
//         }) : '';
//     }) : [];
// }



    export const issueStatusService = {
        create : (bdy) =>  createService.create(bdy),
        forceRemove : (id) =>  removeService.forceRemove(id),
    }

const mediaIsValid = (files)=>{
    for(let x in files){
        if(!files[x].id || !files[x].id.length)
            return ({data:'files is array and must contain media in [id , description]',success:false});
        if(files.length == parseInt(x))
            return({success:true});            
    }
}

const createIssueStatusSequence = (bdy)=>{
    let mediaFiles = [];
    return issueStatusService.create(bdy).then(status=>{
        for(let x in files){
            mediaFiles.push[{
                issue_id:status.issue_id  ,
                issue_status_id:status.id,
                gallery_id : file.id,
                description:file.description,
                user_id:status.user_id
            }]
            if(files.length == parseInt(x))
               return issueStatusMediaService.createMulti(mediaFiles) //add media             
        }
    })

}

const issueStatusCtrl = {
    create : (req,res)=>{
        let files = req.body.files;
        if(files || files.length){
              mediaIsValid(files).success ?
               createIssueStatusSequence(req.body)
               .then(result=>res.json({data:result,success:true}))
               .catch(err=> res.json(configErrMsg(err))) 
               :res.json(mediaIsValid(files))  
        }else
        issueStatusService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(configErrMsg(err)))
    },
    view :(req,res)=>{
        viewService.sort({},[{model:issueModel}])
        .then(result=>res.json(configResultData(result)))
        .catch(err=> res.json(configErrMsg(err)))

    }

}

export default issueStatusCtrl;
