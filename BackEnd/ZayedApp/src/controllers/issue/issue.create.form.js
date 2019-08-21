import {issueStatusService} from './status/issue.status.ctrl';
import {statusService} from '../status.ctrl';
import {issueService} from '../issue/issue.ctrl';
import {uniqId} from '../../../config/imports.config';

let status_id ,issue_id,user_id;

const initChildIssue = (bdy)=>{
        issue_id = bdy.issue_id;
        user_id = bdy.user_id;
        return {status_id,user_id,issue_id};
}

const configIssueStatusData  = () => {
    
}

const rollback = ()=>{

}

const getPendingStatus = ()=>{
    return statusService.getStatusByNum(1)
}

const creatIssueData = (bdy)=>{
    return issueService.create(bdy);   
}


const creatIssueStatus = (bdy)=>{
    bdy.id= uniqId('issue#status!#@');
    return issueStatusService.create(bdy)
}

const creatIssueImg = (bdy)=>{
    
}

const creatIssueVideo = (bdy)=>{
    
}


const sequenceChildIssue = (bdy)=>{
    return Promise.all([
     creatIssueStatus(bdy)   
    ])
}

const sequenceIssue = (bdy)=>{
    return creatIssueData(bdy).then(issue=>{
        bdy["issue_id"] = issue.id;
        return sequenceChildIssue(initChildIssue(bdy));
    }).catch(err=>err);
}



const issueForm = {
    create : (req,res)=>{     
        //? get userId 
            getPendingStatus().then(status=>{
                status_id = status.length ? status[0].id : undefined;
                status.length ? 
                sequenceIssue(req.body).then(result=>res.json(result)) 
                : res.json({data:'No Found Status',success:false});
            });
            //? create issue data
                //* success *// 
                    //? create status issue
                        //* success *//
                        //! rollback    
                    //? create status img
                        //* success *//
                        //! push err "can't add img" 
                    //? create status video
                        //* success *//
                        //! push err "can't add video"
           
          
        
    },

};

export default issueForm;