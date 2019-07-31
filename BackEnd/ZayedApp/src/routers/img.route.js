import {midParse,express} from '../../config/imports.config';
import upload from '../services/file-upload.service';

const imgRouter = express.Router();
const singleUpload = upload.any('imgs');

imgRouter.post('/issue',(req,res) => {
   singleUpload(req,res,(err)=>{
    if(err) return res.json({data:'file upload err',err:err.message,success:false});
    console.log(req.headers['ker'])
    return res.json({imgUrl:req.files}) 
 })
})
module.exports = imgRouter;