let auth ;

const issueStatusMidwr = {
    checkHeadersIsValid : (req,res,next)=>{
        auth = req.session['authorization'];
        let issue_id = req.headers['issue_id'];
        let status_id = req.headers['status_id'];
        let user_id = req.headers['user_id']?req.headers['user_id']:auth['id'];
        if(!issue_id || !status_id) return res.json({data:'issue_id or status_id not define',success:false});
        req.headers = {status_id,issue_id,user_id};
        next();
    }
}

export default issueStatusMidwr;