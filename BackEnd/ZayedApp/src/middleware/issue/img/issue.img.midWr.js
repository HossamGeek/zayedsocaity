let auth ;

const issueImgMidwr = {
    checkIssueIdIsValid : (req,res,next)=>{
        auth = req.session['authorization'];
        let id = req.headers['id'];
        let user_id = req.headers['user_id']?req.headers['user_id']:auth['id'];
        if(!id) return res.json({data:'id not define',success:false});
        req.headers = {id,user_id};
        next();
    }
}

export default issueImgMidwr;