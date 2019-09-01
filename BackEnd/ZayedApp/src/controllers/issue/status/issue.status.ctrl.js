import issue_statusModel from '../../../models/issue/status/issue_status.mdl';
import { configErrMsg } from '../../helper/err.config.hlp';
import {configResultData} from "../../helper/view.hlp";
import ViewService from '../../../services/view.service';
import CreateService from '../../../services/create.service';
import RemoveService from '../../../services/remove.service';
import { issueStatusMediaService } from './issue_status_media.ctrl';
import includeOf from '../../../models/init/included.init';


const viewService = new ViewService(issue_statusModel);
const createService = new CreateService(issue_statusModel);
const removeService = new RemoveService(issue_statusModel);


let  statusDataDB = {};

export const issueStatusService = {
        create : (bdy) =>  createService.create(bdy),
        forceRemove : (id) =>  removeService.forceRemove(id),
}

const rollback = (id) =>issueStatusService.forceRemove(id);

const filesValidator = {
    filesIsFound : (files) => (files && files.length) ? ({success:true}) : {success:false},
    filesIsValid : (files) => {
        let err = 'files is array and must contain media in [id(required),description(optional)]'
        ,valid = files.every(file => file.id  && file.id.length);
        return valid ? ({success:true}) : ({err ,success:false});
       
    }
};

const initStatusMediaForDataBase = 
    (requestFiles = [],StatusData = {}) =>
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
    isHaveMedia : function (bdy) {
        let files =bdy.files;
        return this.create(bdy).then(status=>{
            statusDataDB = status;
            let mediaFiles = initStatusMediaForDataBase(files,status);
            if(mediaFiles.success)
               return this.media(mediaFiles.data) //add media             
        })
    }
}



const initRequest = {
    isHaveFiles : (files,statusBdy,response) =>{
        let filesIsValid = filesValidator.filesIsValid(files);
        if(filesIsValid.success)
            issueStatus.isHaveMedia(statusBdy)
                .then(result=>response.json({data:[...[statusDataDB],result],success:true}))
                .catch(err => {
                    rollback({id:statusDataDB.id});
                    response.json(configErrMsg(err))
                });
         else response.json(filesIsValid);
    },
    isNotHaveFiles : (statusBdy,response) =>{
        issueStatus.create(statusBdy)
        .then(result=>response.json({data:result,success:true}))
        .catch(err=> response.json(configErrMsg(err)))
    }

}


const issueStatusCtrl = {
    create : (req,res)=>{
        let statusBdy = req.body , files = statusBdy.files
        , requestHaveFiles =  filesValidator.filesIsFound(files).success;
        if(requestHaveFiles)
            initRequest.isHaveFiles(files,statusBdy,res);
        else  initRequest.isNotHaveFiles(statusBdy,res);
        
    },
    view :(req,res)=>{
        viewService.sort({},includeOf.issue_status)
        .then(result=>res.json(configResultData(result)))
        .catch(err=> { console.log(err);
            res.json(configErrMsg(err))})

    }

}

export default issueStatusCtrl;