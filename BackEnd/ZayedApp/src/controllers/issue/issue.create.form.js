import {issueStatusService} from './status/issue.status.ctrl';
import {statusService} from '../status.ctrl';
import {issueService} from '../issue/issue.ctrl';
import {issueMediaService} from './media/issue.media.ctrl';
import {uniqId} from '../../../config/imports.config';
import { configErrMsg } from '../helper/err.config.hlp';
import {configResultData} from "../helper/view.hlp";


let status_id ,issue_id,user_id,mediaData=[];


const mediaInit = (files)=>{
    files || files.length ? files.map(file=>{
        file.id ? mediaData.push({
            issue_id,
            user_id,
            gallery_id: file.id,
            id:'issue#media!#@'+file.id
        }) : '';
    }) : [];
};

const initChildIssue = (bdy)=>{
        issue_id = bdy.issue_id;
        user_id = bdy.user_id;
        mediaInit(bdy.files);
        return {status_id,user_id,issue_id};
}

const getPendingStatus = ()=>{
    return statusService.getStatusByNum(1)
}

const removeTransaction = {
    issue:()=>issueService.forceRemove({id:issue_id}),
    media:()=>issueMediaService.forceRemove({issue_id}),
    status:()=>issueStatusService.forceRemove({issue_id}),
    rollback:()=>{
        return Promise.all([
            removeTransaction.status(),
            removeTransaction.media(),
            removeTransaction.issue()  
        ])
    }
}

const rollback = () => removeTransaction.rollback();

const issueCreation = {
    issue:(bdy)=> issueService.create(bdy),
    media:(bdy)=> issueMediaService.createMulti(bdy),
    status : (bdy)=>{
        bdy.id= uniqId('issue#status!#@');
        return issueStatusService.create(bdy)
    }
};


const issueTransaction = {
    parent : (bdy)=>{
        return issueCreation.issue(bdy).then(issue=>{
            bdy["issue_id"] = issue.id;
            let initChildIssueData = initChildIssue(bdy);
            return issueTransaction.child(initChildIssueData);
        }).catch(err=>err)
    },
    child: (bdy)=>{
        if(mediaData.length)  
            return Promise.all([
                issueCreation.status(bdy),
                issueCreation.media(mediaData)
            ]);
        else  return Promise.all([
            issueCreation.status(bdy)
        ]);    
    }
};

const pendingStatusIsFound = (formBody,pendingStatus,response) =>{
    if(pendingStatus.length){
        status_id = pendingStatus[0].id;
        issueTransaction.parent(formBody)
        .then(result=>response.json(configResultData(result)))
        .catch(err=>{
            rollback();
            response.json(configErrMsg(err))
        }) 
    }else response.json({data:'No Found Status',success:false});
}

const issueForm = {
    create : (req,res)=>{     
            getPendingStatus().then(pendingStatus=>{
                pendingStatusIsFound(req.body,pendingStatus,res);
            });
    },

};

export default issueForm;