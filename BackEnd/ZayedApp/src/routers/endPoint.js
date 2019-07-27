import usrRouter from './user.route';
import locationRouter from './location.route';
import roleRouter from './role.route';
import statusRouter from './status.route';
import reportRouter from './report.route';
import evaluationRouter from './evaluation.route';

const Router = app => {
    app.use('/usr',usrRouter);
    app.use('/location',locationRouter);
    app.use('/role',roleRouter);
    app.use('/status',statusRouter);
    app.use('/report',reportRouter);
    app.use('/evaluation',evaluationRouter);
    app.use((req, res, next) =>{
        console.log('404 Not Found...Uh oh, something went wrong!');
        //console.log(createError(404));
        //next(createError(404));
        res.json({data:'404 Not Found...Uh oh, something went wrong!',
           err:(404),success:false});
    });
    
};

export default Router;