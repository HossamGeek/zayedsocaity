import { jwtVerify } from '../services/jwt.service';
import { createErrors } from '../../config/imports.config';
import registerRouter from './register.routes';
import loginRouter from './login.routes';
import locationRouter from './location.routes';
import roleRouter from './role.routes';
import statusRouter from './status.routes';
import reportRouter from './report.routes';
import evaluationRouter from './evaluation.routes';
import galleryRouter from './gallery.routes';
import issueRoute from './issue.routes';



let Auth = auth =>  auth ? jwtVerify(auth.split(' ')[1]) : jwtVerify(''); 
const Router = app => {
   

    app.use('/register',registerRouter);
    app.use('/login',loginRouter);
    app.use('/location',locationRouter);
    app.use('/role',roleRouter);
    app.use('/status',statusRouter);
    app.use('/report',reportRouter);
    app.use('/evaluation',evaluationRouter);

  
    
    app.use((req,res,next)=>{
        let Authorized = Auth(req.headers['authorization']);
        if(!Authorized.success)
             return res.json(Authorized);
        req.session['authorization'] = Authorized.data;
        next();
    });
    app.use('/gallery',galleryRouter);

    app.use('/issue',issueRoute);

    
    app.use((req,res) =>{
        res.json({data:'404 Not Found...Uh oh, something went wrong!',
           err:(404),success:false});
    });
    
};

export default Router;