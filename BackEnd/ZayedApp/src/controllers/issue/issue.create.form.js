import {issueStatusService} from './status/issue.status.ctrl';
import {statusService} from '../status.ctrl';

let status_id ,issue_id,user_id;

const configIssueStatusData  = () => {
    
}


const getPendingStatus = ()=>{
    statusService.getStatusByNum(1).then(value=>{
       status_id = value[0]['id'];
    })
}

const creatIssueStandAlone = (bdy)=>{
    
}


const creatIssueStatus = (bdy)=>{
    issueStatusService.createIssueStatusService(bdy).then(v=>console.log(v))
}

const creatIssueImg = (bdy)=>{
    
}

const creatIssueVideo = (bdy)=>{
    
}



const issueForm = {
    createIssue : (req,res)=>{
        getPendingStatus();
        
    }
};

export default issueForm;