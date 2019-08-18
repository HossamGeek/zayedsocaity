import { jwtVerify } from '../services/jwt.service';
import { createErrors } from '../../config/imports.config';
import registerRouter from './register.route';
import loginRouter from './login.route';
import locationRouter from './location.route';
import roleRouter from './role.route';
import statusRouter from './status.route';
import reportRouter from './report.route';
import evaluationRouter from './evaluation.route';
import imgRouter from './img.route';
import issueRoute from './issue.route';
import issue_statusModel from '../models/issue/status/issue_status.mdl';
//console.log(issue_statusModel);


let Auth = auth =>  auth ? jwtVerify(auth.split(' ')[1]) : jwtVerify(''); 
const Router = app => {
   

    app.use('/register',registerRouter);
    app.use('/login',loginRouter);
    app.use('/location',locationRouter);
    app.use('/role',roleRouter);
    app.use('/status',statusRouter);
    app.use('/report',reportRouter);
    app.use('/evaluation',evaluationRouter);
    app.use('/img',imgRouter);

  
    
    app.use((req,res,next)=>{
        let Authorized = Auth(req.headers['authorization']);
        if(!Authorized.success)
             return res.json(Authorized);
        req.session['authorization'] = Authorized.data;
        next();
    });

    app.use('/issue',issueRoute);

    
    app.use((req,res) =>{
        res.json({data:'404 Not Found...Uh oh, something went wrong!',
           err:(404),success:false});
    });
    
};

export default Router;