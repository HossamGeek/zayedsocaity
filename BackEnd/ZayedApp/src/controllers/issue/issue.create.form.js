import {issueStatusService} from './status/issue.status.ctrl';
import {statusService} from '../status.ctrl';

let status_id ,issue_id,user_id;

const configIssueStatusData  = () => {
    
}

const rollback = ()=>{

}

const getPendingStatus = ()=>{
    return statusService.getStatusByNum(1).then(value=>{
       status_id = value[0]['id'];
    })
}

const creatIssueData = (bdy)=>{
    getPendingStatus().then(done=>{

    })
}


const creatIssueStatus = (bdy)=>{
    issueStatusService.createIssueStatusService(bdy).then(v=>console.log(v))
}

const creatIssueImg = (bdy)=>{
    
}

const creatIssueVideo = (bdy)=>{
    
}



const issueForm = {
    createIssueForm : (req,res)=>{     
        //? get userId 
            user_id = req.session['authorization']['id'];
           //? create issue data
              res.json(req.body);
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