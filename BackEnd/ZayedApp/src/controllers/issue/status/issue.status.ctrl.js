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


let  statusIssueID = '';

export const issueStatusService = {
        create : (bdy) =>  createService.create(bdy),
        forceRemove : (id) =>  removeService.forceRemove(id),
}

const rollback = (id) =>issueStatusService.forceRemove(id);

const validation = {
    requestIsHaveFiles : (files)=>{
        if(files && files.length) return {success:true}
        return {success:false}
    },
    filesIsValid : (files)=>{
        for(let x in files){
            if(!files[x].id || !files[x].id.length)
                return ({data:'files is array and must contain media in [id , description]',success:false});
            if(files.length-1 === parseInt(x))
                 return({success:true});           
        }
    }
};

const initStatusMediaForDataBase = (requestFiles = [],StatusData = {}) =>
    {   
        let mediaFiles = [];
        let requiredMediaData = {
            issue_id:StatusData.issue_id  ,
            issue_status_id:StatusData.id,
            user_id:StatusData.user_id
        };

        for(let x in requestFiles){
            let statusMediaData = Object.assign(requiredMediaData,{
                gallery_id : requestFiles[x].id,
                description:requestFiles[x].description
            });
            mediaFiles.push(statusMediaData);
            if(requestFiles.length-1 === parseInt(x)) return ({data:mediaFiles,success:true})        
        }
     }


const issueStatus = {
    create : (bdy)=> issueStatusService.create(bdy),
    media : (mediaFiles)=> issueStatusMediaService.create(mediaFiles),
    withMedia : (bdy) =>{
        let files =bdy.files;
        return issueStatus.create(bdy).then(status=>{
            statusIssueID = status.id;
            let mediaFiles = initStatusMediaForDataBase(files,status);
            if(mediaFiles.success)
               return  issueStatusMediaService.create(mediaFiles.data) //add media             
        })
    }
}




const issueStatusCtrl = {
    create : (req,res)=>{
        let statusBdy = req.body;
        let files = statusBdy.files;
        let reqHaveFiles =  validation.requestIsHaveFiles(files).success;
        let filesIsValid = validation.filesIsValid(files);

        if(reqHaveFiles){
            filesIsValid.success? 
                issueStatus.withMedia(statusBdy)
                    .then(result=>res.json({data:result,success:true}))
                    .catch(err=>{
                        rollback({id:statusIssueID});
                        res.json(configErrMsg(err))
                    })
            : res.json(filesIsValid);
        }else issueStatus.create(statusBdy)
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