import { jwtVerify } from '../services/jwt.service';
import { createErrors } from '../../config/imports.config';
import registerRouter from './register.route';
import loginRouter from './login.route';
import locationRouter from './location.route';
import roleRouter from './role.route';
import statusRouter from './status.route';
import reportRouter from './report.route';
import evaluationRouter from './evaluation.route';


const Router = app => {
    app.use('/register',registerRouter);
    app.use('/login',loginRouter);
    app.use('/location',locationRouter);
    app.use('/role',roleRouter);
    app.use('/status',statusRouter);
    app.use('/report',reportRouter);
    app.use('/evaluation',evaluationRouter);
    app.use((req,res,next)=>{
        let Authorization = req.headers['authorization'].split(' ')[1];
        let tokenIsValid = jwtVerify(Authorization);
        if(tokenIsValid.success){
            req.headers['authorization'] = tokenIsValid.data;
            next();
        }else res.json(tokenIsValid);
    })

    app.use( (req,res) =>{
        console.log('404 Not Found...Uh oh, something went wrong!');
        console.log(createErrors(404));
        res.json({data:'404 Not Found...Uh oh, something went wrong!',
           err:(404),success:false});
        //next(createErrors(404));
    });
    
};

export default Router;