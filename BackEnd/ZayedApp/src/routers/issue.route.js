import {midParse,express} from '../../config/imports.config';
import issueMidWr from '../middleware/issue/issue.midWr';
import issueCtrl from '../controllers/issue/issue.ctrl';
import issueForm from '../controllers/issue/issue.create.form';
import {imgFilter} from '../services/file-upload.service';
const imgUpload = imgFilter.any('imgs');
const videoUpload = imgFilter.any('videos');
const issueRouter = express.Router();


const imgIsUploaded = (req,res,next) => imgUpload(req,res,(err)=>{
    if(err) return res.json({data:'file upload err',err:err.message,success:false});
    req.body.imgsUrl =  req.files;
    next();
 })

 const videoIsUploaded = (req,res,next)=> videoUpload(req,res,(err)=>{
    if(err) return res.json({data:'file upload err',err:err.message,success:false});
    req.body.videosUrl =  req.files;
 })

issueRouter.route('')
.post(midParse,issueMidWr.configIssueData,issueCtrl.create);

//issueRouter.post('/new',midParse,issueMidWr.configIssueData,issueForm.createIssueForm);

issueRouter.post('/new',imgIsUploaded,(req,res)=>{

    res.json(req.body)
})


issueRouter.get('/usr',issueMidWr.userSearch,issueCtrl.view);
issueRouter.get('/id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/location_id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/issue_num',issueMidWr.customSearch,issueCtrl.view);

module.exports = issueRouter;