import {midParse,express} from '../../config/imports.config';
import {imgFilter} from '../services/file-upload.service';

const imgRouter = express.Router();
const singleUpload = imgFilter.any('imgs');

imgRouter.post('/issue',(req,res) => {
   singleUpload(req,res,(err)=>{
    if(err) return res.json({data:'file upload err',err:err.message,success:false});
    return res.json({imgUrl:req.files}) 
 })
})
module.exports = imgRouter;