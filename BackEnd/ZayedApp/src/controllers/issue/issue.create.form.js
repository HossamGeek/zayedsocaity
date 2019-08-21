import {issueStatusService} from './status/issue.status.ctrl';
import {statusService} from '../status.ctrl';
import {issueService} from '../issue/issue.ctrl';
import {issueMediaService} from './media/issue.media.ctrl';
import {uniqId} from '../../../config/imports.config';

let status_id ,issue_id,user_id,files=[];

const getPendingStatus = ()=>{
    return statusService.getStatusByNum(1)
}

const initChildIssue = (bdy)=>{
        issue_id = bdy.issue_id;
        user_id = bdy.user_id;
        files = bdy.files;
        return {status_id,user_id,issue_id,files};
}

const IssueRollback = {
    issue:()=>issueService.forceRemove({id:issue_id}),
    media:()=>issueMediaService.forceRemove(issue_id),
    status:()=>issueStatusService.forceRemove(issue_id),
    rollback:()=>{
        new Promise([
            IssueRollback.media(),
            IssueRollback.status(),
            IssueRollback.issue()
            
            
        ])
    }
}



const issueCreation = {
    issue:(bdy)=>{return issueService.create(bdy)},
    media:(bdy)=>{
        return issueMediaService.create(bdy);
    },
    status : (bdy)=>{
        bdy.id= uniqId('issue#status!#@');
        return issueStatusService.create(bdy)
    }
};

const mediaInit = (bdy)=>{
    files.map(file=>{
        bdy.gallery_id = file.id;
        bdy.id= uniqId('issue#media!#@');//not unique
        issueCreation.media(bdy).then(rs=>{
            console.log(rs);
        }).catch(err=>console.log(err));
    })
} 

const issueSequenceProcess = {
    parent : (bdy)=>{
        return issueCreation.issue(bdy).then(issue=>{
            bdy["issue_id"] = issue.id;
            let initChildIssueData = initChildIssue(bdy);
            return issueSequenceProcess.child(initChildIssueData);
        })
    },
    child: (bdy)=>{
        return new Promise.all([
            issueCreation.status(bdy),
            mediaInit(bdy)
        ]).then(rs=>{
            console.log('object');
        })
       
    }
}



const issueForm = {
    create : (req,res)=>{     
        //? get userId 
            getPendingStatus().then(status=>{
                status_id = status.length ? status[0].id : undefined;
                status.length ? 
                issueSequenceProcess.parent(req.body).then(result=>res.json(result))
                .catch(err=>{
                    IssueRollback.rollback();
                    res.json({data:'transaction Failed',err,success:false})
                }) 
                : res.json({data:'No Found Status',success:false});
            });




    },

};

export default issueForm;