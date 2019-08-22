import {issueStatusService} from './status/issue.status.ctrl';
import {statusService} from '../status.ctrl';
import {issueService} from '../issue/issue.ctrl';
import {issueMediaService} from './media/issue.media.ctrl';
import { configErrMsg } from '../helper/err.config.hlp';
import {configResultData} from "../helper/view.hlp";

let status_id ,issue_id ,user_id,mediaFiles;

const prepare = {
    mediaData : (files)=>
        {
            //! files have data and must be contain [{id}] 
            //! then >> push these files data to media data
            files || files.length ? files.map(file=>{
                file.id ? mediaFiles.push({
                    issue_id,
                    user_id,
                    gallery_id: file.id
                }) : '';
            }) : [];
    },
    childIssueData : (bdy) => {
            issue_id = bdy.issue_id;
            user_id = bdy.user_id;
            prepare.mediaData(bdy.files);
            return {status_id,user_id,issue_id};
    }
}


const transaction = {
    view : {
        pendingStatus: ()=> statusService.getStatusByNum(1),
        issue:(Where,include,limit,sort)=>issueService.sort(Where,include,limit,sort)
    },
    create :  {
        issue:(bdy)=> issueService.create(bdy),
        media:(bdy)=> issueMediaService.createMulti(bdy),
        status : (bdy)=> issueStatusService.create(bdy)
        
    },
    remove : {
        issue:()=>issueService.forceRemove({id:issue_id}),
        media:()=>issueMediaService.forceRemove({issue_id}),
        status:()=>issueStatusService.forceRemove({issue_id}),
        rollback:()=>{
            return Promise.all([
                transaction.remove.status(),
                transaction.remove.media(),
                transaction.remove.issue()  
            ])
        }
    },
    
};


const concurrence = {
    create:{
            //? first >> create #issue then >> prepare #status and #media data
            //? second >> create status and media 
                //* if media have data >> create #status and #media
                //! if media not have data >> create #status only  
            issue : (bdy)=>{
                return transaction.create.issue(bdy).then(issue=>{
                    bdy["issue_id"] = issue.id;
                    let childData = prepare.childIssueData(bdy);
                    return concurrence.create.childIssue(childData);
                })
            },
            childIssue: (bdy)=>{
                if(mediaFiles.length)  
                    return Promise.all([
                        transaction.create.status(bdy),
                        transaction.create.media(mediaFiles)
                    ]);
                else  return Promise.all([
                    transaction.create.status(bdy)
                ]);    
            }
    }
    
}

const rollback = () => transaction.remove.rollback();

const isFound = {
    pendingStatus : (formBody,pendingStatus,response) =>{
        if(pendingStatus.length){
            status_id = pendingStatus[0].id;
            concurrence.create.issue(formBody)
            .then(result=>{
                response.json({data:result,success:true})})
            .catch(err=>{
                rollback();
                response.json(configErrMsg(err))
            }) 
        }else  response.json({data:'No Found Status',success:false});
    }
}



export default class IssueForm{
    constructor(){
        status_id = '' ;
        issue_id = '' ;
        user_id = '' ;
        mediaFiles = [];
    }
    create (req,res){     
            transaction.view.pendingStatus().then(pendingStatus=>{
                isFound.pendingStatus(req.body,pendingStatus,res);
            });
    }
    view (req,res){
        transaction.view.issue().then(result=>{
            res.json(result);
        })
    }

}

